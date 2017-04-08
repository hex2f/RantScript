'use strict';

const url = require('url');
const fetch = require('node-fetch');
const FormData = require('form-data');

let compress = true;
let debug = false;

let SETTINGS = {
	SET_COMPRESS: function (s) {compress = s;},
	GET_COMPRESS: function () {return compress;},
	SET_DEBUG: function (s) {debug = s;},
	GET_DEBUG: function () {return debug;},
}

function log(m) {
	if(debug) {console.log(m)}
}

/**
 * @param {String} uri    - request URL
 * @param {Object} params - request parameters
 * @return {Promise}  HTTP response
 */

function GET(uri, params) {
	const requestURL = `${uri}${url.format({ query: params })}`;
  log(`request URL: ${requestURL}`);

	return fetch(requestURL, { method: 'GET', compress: compress })
    .then(function handleRequest(res) {
      const statusText = res.statusText;
			const status = res.status;
			if (status != 200) {
				const error = new Error(`Request failed: ${statusText}`);
				error.status = status;
				throw error;
			}
			return res.json();
		})
		.catch(error => {
			log(`error: ${error}`);
			throw error;
		});
}

function POST(uri, params) {
	var form = new FormData();
	for (var i in params) {
		form.append(i, params[i]);
	}

	const requestURL = `${uri}`;
  log(`request URL: ${requestURL}`);

	return fetch(requestURL, { method: 'POST', compress: compress, formData: form, body: form, headers: form.getHeaders() })
    .then(function handleRequest(res) {
			const status = res.status;
			if (status != 200) {
				const error = new Error(`Request failed: ${status}`);
				error.status = status;
				throw error;
			}
			return res.json();
		})
		.catch(error => {
			log(`error: ${error}`);
			throw error;
		});
}

module.exports = {GET,POST,SETTINGS};

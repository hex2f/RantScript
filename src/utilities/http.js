'use strict';

const url = require('url');
const fetch = require('node-fetch');
const FormData = require('form-data');

/**
 * @param {String} uri    - request URL
 * @param {Object} params - request parameters
 * @return {Promise}  HTTP response
 */

function GET(uri, params) {
	const requestURL = `${uri}${url.format({ query: params })}`;
  console.log(`request URL: ${requestURL}`);

	return fetch(requestURL)
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
			console.log('error: ', error);
			throw error;
		});
}

function POST(uri, params) {
	var form = new FormData();
	for (var i in params) {
		form.append(i, params[i]);
	}

	const requestURL = `${uri}`;
  console.log(`request URL: ${requestURL}`);

	return fetch(requestURL, { method: 'POST', formData: form, body: form, headers: form.getHeaders() })
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
			console.log('error: ', error);
			throw error;
		});
}

module.exports = {GET,POST};

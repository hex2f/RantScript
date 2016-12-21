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
	var data = new FormData();
	for (var i = 0; i < params.length; i++) {
		data.append(params[i].key(), 1);
	}
	console.log(data);
	const requestURL = `${uri}`;
  console.log(`request URL: ${requestURL}`);
	console.log(`request Body: ${url.format({ query: params })}`)
	return fetch(requestURL, { method: 'POST', body: data, headers: {contentType: 'multipart/form-data'} })
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

module.exports = {GET,POST};

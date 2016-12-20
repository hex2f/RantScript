'use strict';

const url = require('url');
const fetch = require('node-fetch');

/**
 * @param {String} url    - request URL
 * @param {Object} params - request parameters
 * @return {Promise}  HTTP response
 */

function GET(uri, params) {
	const requestURL = `${url}${url.format({ query: params })}`;
  log(`request URL: ${requestURL}`);
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
			log('error: ', error);
			throw error;
		});
}

module.exports = {GET};

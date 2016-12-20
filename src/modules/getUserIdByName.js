'use strict';
const co = require('co');
const http = require('../utilities/http');
const variables = require('../variables');

function _getIdByUsername(username) {
	const url = `${variables.API}/get-user-id`;
	const parameters = {
		app: 3,
		username
	};

	return http
    .GET(url, parameters)
    .then(data => data.user_id);
}

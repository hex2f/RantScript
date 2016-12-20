'use strict';
const co = require('co');
const http = require('./utilities/http');
const variables = require('variables');
const getUserIdByName = require('.modules/getUserIdByName');

function profile(username = _noUsernameError()) {
	return co(function *resolveUsername() {
		const user_id = yield getUserIdByName(username);
		const url = `${variables.API}/users/${user_id}`;
		const parameters = { app: 3	};

		return http
			.GET(url, parameters)
			.then(data => data.profile);
	});
}

module.exports = {
  profile
}

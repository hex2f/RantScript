'use strict';
const co = require('co');
const http = require('./utilities/http');
const variables = require('./variables');
const getUserIdByName = require('./modules/getUserIdByName.js');

function profile(username) {
	return co(function *resolveUsername() {
		const user_id = yield getUserIdByName(username);
		const url = `${variables['API']}/users/${user_id}`;
		const parameters = { app: 3	};

		return http
			.GET(url, parameters)
			.then(data => data.profile);
	});
}

function rant(rant_id) {
	return co(function *getrant() {
		const url = `${variables['API']}/devrant/rants/${rant_id}`;
		const parameters = { app: 3	};

		return http
			.GET(url, parameters);
	});
}

function rants(sort, limit, skip) {
	const url = `${variables['API']}/devrant/rants`;
	const parameters = {
		app: 3,
		sort, limit, skip
	};

	return http
		.GET(url, parameters)
		.then(data => data.rants);
}

function search(query) {
	const url = `${variables['API']}/devrant/search`;
	const parameters = {
		app: 3,
		term: query
	};

	return http
		.GET(url, parameters)
		.then(data => data.results);
}

function login(email, passwd) {
	const url = `${variables['API']}/users/auth-token`;
	const parameters = {
		app: 3,
		username: email,
		password: passwd,
		plat: 3
	};

	return http
		.POST(url, parameters)
		.then(data => data.results);
}

module.exports = {
  profile,
	rant,
	rants,
	search,
	login
}

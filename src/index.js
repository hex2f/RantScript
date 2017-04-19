'use strict';
const co = require('co');
const http = require('./utilities/http');
const variables = require('./variables');
const getUserIdByName = require('./modules/getUserIdByName.js');
const httpSettings = http.SETTINGS;

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

function rant(rant_id, token) {
	return co(function *getrant() {
		const url = `${variables['API']}/devrant/rants/${rant_id}`;
		let parameters = { app: 3	};
		console.log(token)
		if (token != null && token != undefined) {
			const token_id = token["id"];
			const token_key = token["key"];
			const user_id = token["user_id"];
			parameters = {
				app: 3,
				token_id, token_key, user_id
			};
		}

		return http
			.GET(url, parameters);
	});
}

function rants(sort, limit, skip, token) {
	const url = `${variables['API']}/devrant/rants`;

	let parameters = {
		app: 3,
		sort, limit, skip
	};

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			sort, limit, skip, token_id, token_key, user_id
		};
	}

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
		.POST(url, parameters);
}

function postRant(rant, tags, token_id, token_key, user_id) {
	const url = `${variables['API']}/devrant/rants`;
	const parameters = {
		app: 3,
		plat: 3,
		rant: rant,
		tags: tags,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	return http
		.POST(url, parameters);
}

function postComment(text, rant_id, token_id, token_key, user_id) {
	const url = `${variables['API']}/devrant/rants/${rant_id}/comments`;
	const parameters = {
		app: 3,
		plat: 3,
		comment: text,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	return http
		.POST(url, parameters);
}

function vote(vote, rant_id, token_id, token_key, user_id) {
	const url = `${variables['API']}/devrant/rants/${rant_id}/vote`;
	const parameters = {
		app: 3,
		plat: 3,
		vote: vote,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	return http
		.POST(url, parameters);
}

function voteComment(vote, comment_id, token_id, token_key, user_id) {
	const url = `${variables['API']}/comments/${comment_id}/vote`;
	const parameters = {
		app: 3,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id,
		vote: vote,
	};

	return http
		.POST(url, parameters);
}

function notifications(token, last_time) {
	if(last_time === undefined) { last_time = 0; }
	const url = `${variables['API']}/users/me/notif-feed`;
	const parameters = {
		app: 3,
		token_id: token["id"],
		token_key: token["key"],
		user_id: token["user_id"],
		last_time: last_time,
		plat: 2,
		ext_prof: 1,
	};

	return http
		.GET(url, parameters)
}

function collabs(sort = 'recent', limit, skip, token) {
	const url = `${variables['API']}/devrant/collabs`;

	let parameters = {
		app: 3,
		sort, limit, skip
	};

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			sort, limit, skip, token_id, token_key, user_id
		};
	}

	return http
		.GET(url, parameters)
		.then(data => data.rants);
}

function stories(range = 'week', sort = 'recent', limit, skip, token) {
	// sort = ['recent', 'top']
	// range = ['day', 'week', 'month', 'all']
	const url = `${variables['API']}/devrant/story-rants`;

	let parameters = {
		app: 3,
		range, sort, limit, skip
	};

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			range, sort, limit, skip, token_id, token_key, user_id
		};
	}

	return http
		.GET(url, parameters)
		.then(data => data.rants);
}

module.exports = {
	httpSettings,
  	profile,
	rant,
	rants,
	search,
	login,
	postRant,
	postComment,
	vote,
	voteComment,
	notifications,
	collabs,
	stories
}

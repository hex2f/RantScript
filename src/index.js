'use strict';
const co = require('co');
const http = require('./utilities/http');
const getUserIdByName = require('./utilities/getIdByName');
const variables = require('./variables');
const httpSettings = http.SETTINGS;

function profile(user_id, token, content, skip) {
	return co(function *resolveUsername() {
		if(isNaN(user_id)) {
			user_id = yield getUserIdByName(user_id);
		}

		if(content == undefined) {content="all"}
		if(skip == undefined) {skip=0}
		
		const url = `${variables['API']}/users/${user_id}`;
		let parameters = { app: 3, plat: 2 };
		if (content != null && content != undefined) {
			parameters = { app: 3, plat: 2, content };
		}
		if (skip != null && skip != undefined) {
			parameters = { app: 3, plat: 2, skip };
		}
		if (content != null && content!= undefined && skip != null && skip != undefined) {
			parameters = { app: 3, plat: 2, content, skip };
		}
		if (token != null && token != undefined) {
			const token_id = token["id"];
			const token_key = token["key"];
			const user_id = token["user_id"];
			parameters = {
				app: 3,
				plat: 2,
				content,
				skip,
				token_id, token_key, user_id
			};
		}

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

function rants(sort, limit, skip, prev_set, token, range) {
	const url = `${variables['API']}/devrant/rants`;

	let parameters = {
		app: 3,
		sort, limit, skip, prev_set
	};

	if(range != undefined && range != null) {
		parameters = {
			app: 3,
			sort, limit, skip, prev_set, range
		};
	}

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			sort, limit, skip, token_id, token_key, user_id, prev_set
		};
		if(range != undefined && range != null) {
			parameters = {
				app: 3,
				sort, limit, skip, range, token_id, token_key, user_id, prev_set
			};
		}
	}

	return http
		.GET(url, parameters)
		.then(data => data);
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

function getFrequentSearchTerms() {
	const url = `${variables['API']}/devrant/search/tags`;
	const parameters = {
    app: 3,
    plat: 3
	};

	return http
		.GET(url, parameters)
		.then(data => data.tags);
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

function postRant(rant, tags, type, token, imagePath) {
	const url = `${variables['API']}/devrant/rants`;

	if(type == undefined) {type = 1}

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 3,
		rant: rant,
		tags: tags,
		type: type,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	if(imagePath !== undefined && imagePath !== null) {
		return http.POST_FILE(url, parameters, imagePath);
	} else {
		return http.POST(url, parameters);
	}
}

function editRant(text, tags, rant_id, token, imagePath) {
	const url = `${variables['API']}/devrant/rants/${rant_id}`;

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		rant: text,
		tags: tags,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	if(imagePath !== undefined && imagePath !== null) {
		return http.POST_FILE(url, parameters, imagePath);
	} else {
		return http.POST(url, parameters);
	}
}

function postComment(text, rant_id, token, imagePath) {
	const url = `${variables['API']}/devrant/rants/${rant_id}/comments`;

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		comment: text,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	if(imagePath !== undefined && imagePath !== null) {
		return http.POST_FILE(url, parameters, imagePath);
	} else {
		return http.POST(url, parameters);
	}
}

function editComment(text, comment_id, token, imagePath) {
	const url = `${variables['API']}/comments/${comment_id}`;

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		comment: text,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	if(imagePath !== undefined && imagePath !== null) {
		return http.POST_FILE(url, parameters, imagePath);
	} else {
		return http.POST(url, parameters);
	}
}

function favorite(isfav, rant_id, token) {
	const url = `${variables['API']}/devrant/rants/${rant_id}/favorite`;
	if(isfav === false) {
		const url = `${variables['API']}/devrant/rants/${rant_id}/unfavorite`;
	}
	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	return http
		.POST(url, parameters);
}

function subscribe(bool, userToSubscribe, token) {
	const url = `${variables['API']}/users/${userToSubscribe}/subscribe`;
	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

	if (!bool) {
		return http.DELETE(url, parameters);
	}

	return http
		.POST(url, parameters);
}

function deleteRant(rant_id, token) {
	const url = `${variables['API']}/devrant/rants/${rant_id}`;
	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

  return http.DELETE(url, parameters);
}

function deleteComment(comment_id, token) {
	const url = `${variables['API']}/comments/${comment_id}`;
	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

  return http.DELETE(url, parameters);
}

function vote(vote, rant_id, token) {
	const url = `${variables['API']}/devrant/rants/${rant_id}/vote`;

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

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

function voteComment(vote, comment_id, token) {
	const url = `${variables['API']}/comments/${comment_id}/vote`;

	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

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

function clearNotifications(token) {
	const url = `${variables['API']}/users/me/notif-feed`;
	const parameters = {
		app: 3,
		token_id: token["id"],
		token_key: token["key"],
		user_id: token["user_id"],
		plat: 2,
	};

	return http
		.DELETE(url, parameters)
}

function collabs(sort, limit, skip, token) {
	if(sort == undefined)
		sort = 'recent';
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

function stories(range, sort, limit, skip, token) {
	if(range == undefined)
		range = 'week';
	if(sort == undefined)
		sort = 'recent';
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

function weekly(week, sort, limit, skip, token) {
	if(sort == undefined)
		sort = 'recent';
	// sort = ['algo', recent', 'top']
	// week = <week_number>
	const url = `${variables['API']}/devrant/weekly-rants`;

	let parameters = {
		app: 3,
		week, sort, limit, skip
	};

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			week, sort, limit, skip, token_id, token_key, user_id
		};
	}

	return http
		.GET(url, parameters)
		.then(data => data.rants);
}

function listWeekly(token) {
	const url = `${variables['API']}/devrant/weekly-list`;

	let parameters = {
		app: 3,
		plat: 2,
	};

	if (token != null && token != undefined) {
		const token_id = token["id"];
		const token_key = token["key"];
		const user_id = token["user_id"];
		parameters = {
			app: 3,
			plat: 2,
			token_id, token_key, user_id
		};
	}

	return http
		.GET(url, parameters)
		.then(data => data.weeks);
}


function supporters() {
	const url = `${variables['API']}/devrant/supporters`;
	
	const parameters = {
		app: 3	
	};
	
  	return http.GET(url, parameters);
}

function surpriseRant(token) {
	const url = `${variables['API']}/devrant/rants/surprise`;
	const token_id = token["id"];
	const token_key = token["key"];
	const user_id = token["user_id"];

	const parameters = {
		app: 3,
		plat: 2,
		token_id: token_id,
		token_key: token_key,
		user_id: user_id
	};

  return http.GET(url, parameters);
}

module.exports = {
	httpSettings,
	profile,
	rant,
	rants,
	search,
	login,
	postComment,
	postRant,
	vote,
	voteComment,
	surpriseRant,
	notifications,
	clearNotifications,
	collabs,
	stories,
	weekly,
	listWeekly,
	favorite,
	subscribe,
	deleteRant,
	deleteComment,
	getFrequentSearchTerms,
	editComment,
	editRant,
	supporters
}

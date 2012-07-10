interfaces.Instagram = function() {
	var http = new net.Http();
	var hostUrl = 'https://api.instagram.com/v1';

	this.get = function(url, callbacks) {
		return this.action('GET', url, '', callbacks);
	};

	this.post = function(url, params, callbacks) {
		return this.action('POST', url, params, callbacks);
	};

	this.del = function(url, callbacks) {
		return this.action('DELETE', url, '', callbacks);
	};

	this.action = function(method, url, params, callbacks) {
		//add auth code to url
		url = hostUrl + url;
		var token = Global.OAuthToken;
		if (url.indexOf('?') >= 0) {
			url += '&access_token=' + token;
		} else {
			url += '?access_token=' + token;
		}
		switch (method) {
		case 'GET':
			return http.get(url, '', callbacks);
		case 'POST':
			return http.post(url, params, '', callbacks);
		case 'DELETE':
			return http.del(url, '', callbacks);
		case 'PUT':
			return http.put(url, params, '', callbacks);
		}
	};

	//----user----//
	this.getUsers = function(callbacks, uid) {
		return this.get('/users/' + uid, callbacks);
	};

	this.getUsersSearch = function(callbacks, who) {
		return this.get('/users/search?q=' + who, callbacks);
	};

	this.getUsersFollows = function(callbacks, who) {
		return this.get('/users/' + who + '/follows', callbacks);
	};

	this.getUsersFollowedBy = function(callbacks, who) {
		return this.get('/users/' + who + '/followed-by', callbacks);
	};

	//----get media-------//
	this.getUsersFeed = function(callbacks) {
		return this.get('/users/self/feed', callbacks);
	};

	this.getUsersMediaRecent = function(callbacks, uid) {
		return this.get('/users/' + uid + '/media/recent', callbacks);
	};

	this.getUsersMediaRecentSelf = function(callbacks) {
		return this.getUsersMediaRecent(callbacks, 'self');
	};

	this.getUsersMediaLiked = function(callbacks) {
		return this.get('/users/self/media/liked', callbacks);
	};

	this.getMediaPopular = function(callbacks) {
		return this.get('/media/popular', callbacks);
	};

	this.getMediaSearch = function(callbacks) {
		return this.get('/media/search?lat=' + lat + '&lng=' + lng, callbacks);
	};

	//----relationship--------//
	this.getUsersRelationship = function(callbacks, uid) {
		return this.get('/users/' + uid + '/relationship', callbacks);
	};

	this.postUsersRelationship = function(callbacks, uid, action) {
		var params = {
			action: action
		};
		return this.post('/users/' + uid + '/relationship', params, callbacks);
	};

	//----media likes----//
	this.getMediaLikes = function(callbacks, media) {
		return this.get('/media/' + media + '/likes', callbacks);
	};

	this.postMediaLikes = function(callbacks, media) {
		return this.post('/media/' + media + '/likes', {},
		callback);
	};

	this.delMediaLikes = function(callback, media) {
		return this.del('/media/' + media + '/likes', callbacks);
	};

	//----media comment----//
	this.getMediaComments = function(callbacks, media) {
		return this.get('/media/' + media + '/comments', callbacks);
	};

	this.postMediaComments = function(callbacks, media, comment) {
		return this.post('/media/' + media + '/comments', {
			text: comment
		},
		callbacks);
	};

	this.delMediaComments = function(callbacks, media, comment) {
		return this.del('/media/' + media + '/comments/' + comment, callbacks);
	};

	//----location----//
	this.getLocationsSearch = function(callbacks, lat, lng, distance) {
		if(!distance) {
			distance = interfaces.Instagram.DEFAULT_LOCATION_SEARCH_DISTANCE;
		}

		return this.get('/locations/search?lat=' + lat + '&lng=' + lng + '&distance=' + distance, callbacks);
	};
};

interfaces.Instagram.Actions = {
	FOLLOW: 'follow',
	UNFOLLOW: 'unfollow',
	BLOCK: 'block',
	UNBLOCK: 'unblock',
	APPROVE: 'approve',
	DENY: 'deny'
};

interfaces.Instagram.Relationships = {
	NONE: 'none',
	FOLLOWS: 'follows',
	REQUESTED: 'requested'
};

interfaces.Instagram.DEFAULT_LOCATION_SEARCH_DISTANCE = 5000;

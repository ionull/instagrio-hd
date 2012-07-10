interfaces.Instagrio = function() {
	var http = new net.Http();
	var hostUrl = 'http://instagrio.tsung.bz';

	this.get = function(url, callbacks) {
		return this.action('GET', url, '', callbacks);
	};

	this.post = function(url, params, callbacks) {
		return this.action('POST', url, params, callbacks);
	};

	this.action = function(method, url, params, callbacks) {
		url = hostUrl + url;
		switch (method) {
		case 'GET':
			return http.get(url, '', callbacks);
		case 'POST':
			return http.post(url, params, '', callbacks);
		}
	};

	this.getToken = function(callbacks, passcode) {
		return this.get('/token/get?passcode=' + passcode, callbacks);
	}
};


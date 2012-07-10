net.Http = function() {
	var that = this;
	var timeoutInSeconds = net.Http.DEFAULT_TIMEOUT_IN_SECONDS;
	this.setTimeoutInSeconds = function(seconds) {
		timeoutInSeconds = seconds || timeoutInSeconds;
	};

	var privateFn = {
		response: function(result, callbacks) {
			enyo.log('on response: ' + JSON.stringify(result));
			privateFn.parseJSON(result);

			if (callbacks && callbacks.onSuccess && typeof callbacks.onSuccess == 'function') {
				callbacks.onSuccess(result.xhr);
			}
		},

		error: function(result, callbacks) {
			enyo.log('on error: ' + JSON.stringify(result));
			privateFn.parseJSON(result);

			if (callbacks && callbacks.onFailure && typeof callbacks.onFailure == 'function') {
				callbacks.onFailure(result);
			}
		},

		parseJSON: function(result) {
			if (!result.xhr.responseJSON) {
				try {
					enyo.log('try to parse json');
					result.xhr.responseJSON = JSON.parse(result.xhr.responseText);
				} catch(e) {
					enyo.error('fail json parse' + JSON.stringify(e));
				}
			}
			if (result.xhr.responseJSON) {
				enyo.log('on response: ' + JSON.stringify(result.xhr.responseJSON));
			} else {
				enyo.log('no response JSON');
			}
		}
	};

	this.action = function(method, url, params, headers, callbacks) {
		var request = new enyo.Ajax({
			url: url,
			method: method,
			headers: headers
		});

		request.response(function(result) {
			privateFn.response(result, callbacks);
		});
		request.error(function(result) {
			privateFn.error(result, callbacks);
		});
		request.go(params);
		return request;
	};
	this.post = function(url, params, headers, callbacks) {
		return this.action('POST', url, params, headers, callbacks);
	};

	this.put = function(url, params, headers, callbacks) {
		return this.action('PUT', url, params, headers, callbacks);
	};

	this.get = function(url, headers, callbacks) {
		return this.action('GET', url, '', headers, callbacks);
	};

	this.del = function(url, headers, callbacks) {
		return this.action('DELETE', url, '', headers, callbacks);
	};

};

net.Http.DEFAULT_TIMEOUT_IN_SECONDS = 60;


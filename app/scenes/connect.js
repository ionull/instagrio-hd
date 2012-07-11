enyo.kind({
	name: "io.OAuthPasscode",
	kind: enyo.Control,
	components: [{
		kind: 'enyo.Input',
		name: 'passcode'
	}, {
		kind: 'enyo.Button',
		content: 'Auth!',
		ontap: 'onConfirm'
	}],
	create: function() {
		enyo.log('on passcode create');
		this.inherited(arguments);
	},
	onConfirm: function() {
		var passcode = this.$.passcode.hasNode().value;
		enyo.log('onConfirm' + passcode);
		Global.instagrio.getToken({
			onSuccess: function(response) {
				enyo.log('on token response: ' + response.responseText);
				//okay, we got it
				try {
					Global.OAuthToken = response.responseJSON.data.token;
					localStorage.setItem(Global.tokenStorageKey, Global.OAuthToken);
					//going to main scene
					new io.Main().renderInto(document.body);
				} catch(e) {
					enyo.error('token response error');
				}
			},
			onFailure: function() {
				enyo.error('token not exist!');
			}
		}, passcode);
	}
});

enyo.kind({
	name: "io.Connect",
	kind: enyo.Control,
	content: "Connect",
	components: [{
		name: 'ConnectButton',
		kind: enyo.Control,
		classes: 'connectBtn',
		onclick: 'onConnect',
		onmousedown: 'onMouseDown',
		onmouseup: 'onMouseUp',
		onmouseout: 'onMouseUp'
	}],
	style: 'background: #A1AC88;width:100%;height:100%;',
	create: function() {
		enyo.log('on connect create');
		this.inherited(arguments);
	},
	onConnect: function(e) {
		enyo.log('on connect click');
		var clientID = '9b384ddcfacc427c99396cc068f2798b';
		var redirectUri = 'http://instagrio.tsung.bz/token';
		var url = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectUri + '&response_type=code&scope=likes+comments+relationships';
		enyo.log('opening url: ' + url);
		document.location.href = url;
		
		//now waiting for user to input passcode
		new io.OAuthPasscode().renderInto(document.body);
	},
	onMouseDown: function(e) {
		enyo.log('on mouse down');
		e.addStyles("background-position: 0 -86px;");
	},
	onMouseUp: function(e) {
		enyo.log('on mouse up');
		e.addStyles("background-position: 0 0;");
	}
});

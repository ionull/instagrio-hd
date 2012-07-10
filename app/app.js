enyo.kind({
	name: "io.App",
	kind: enyo.Control,
	components: [{
		kind: enyo.Signals,
		onWindowActivated: "windowActivated",
		onWindowDeactivated: "windowDeactivated",
		onWindowParamsChange: "windowParamsChange"
	}],
	create: function() {
		enyo.log('on create');
		this.inherited(arguments);
		if (localStorage) {
			//localStorage.removeItem(Global.tokenStorageKey);
			Global.OAuthToken = localStorage.getItem(Global.tokenStorageKey);
		}
		if (Global.OAuthToken) {
			this.handleLaunch(enyo.windowParams);
		} else {
			this.laterLaunch(new io.Connect());
		}
	},
	laterLaunch: function(scene) {
		if(scene && scene.renderInto) {
			setTimeout(function() {
				scene.renderInto(document.body);
			},
			100);
		}
	},
	handleLaunch: function(params) {
		enyo.log('----on launch-----' + JSON.stringify(params));
		if (params) {
			//
		}
		this.laterLaunch(new io.Main());
	},
	windowActivated: function() {
		enyo.log('----on windowActivated-----');
	},
	windowDeactivated: function() {
		enyo.log('----on windowDeactivated-----');
	},
	windowParamsChange: function() {
		enyo.log('----on windowParamsChange-----');
	}
});

var Global = {
	tokenStorageKey: 'oauth_token',
	instagram: new interfaces.Instagram(),
	instagrio: new interfaces.Instagrio()
};

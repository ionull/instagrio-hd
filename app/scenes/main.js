enyo.kind({
	name: "io.Main",
	kind: enyo.Control,
	content: 'Hello world!',
	create: function() {
		var that = this;
		enyo.log('on main create');
		this.inherited(arguments);
		this.items = [];
		this.origItems = [];
		this.fetch('HOT');
		//this.$.mediaList.renderViews(5);
		//this.index = 1;
		this.index = 0;
	},
	fetch: function(which) {
		var callbacks = {
			onSuccess: this.onSuccess.bind(this),
			onFailure: function() {
				enyo.log('media list get failure');
			}.bind(this)
		};
		switch (which) {
		case 'HOME':
			Global.instagram.getUsersFeed(callbacks);
			break;
		case 'HOT':
			Global.instagram.getMediaPopular(callbacks);
			break;
		case 'MINE':
			Global.instagram.getUsersMediaRecentSelf(callbacks);
			break;
		case 'LIKED':
			Global.instagram.getUsersMediaLiked(callbacks);
			break;
		default:
			break;
		}
	},
	onSuccess: function(result) {
		var that = this;
		enyo.log('media list get success');
		//this.$.mediaList.renderViews(0);
		var json = result.responseJSON;
		this.onResult(json);
	},
	onResult: function(json) {
		var that = this;
		if (json && json.data) {
			var jsonData = json.data;
			if (jsonData.length > 0) {
				enyo.log('first item: ' + JSON.stringify(jsonData[0]));
			}
			this.items = new io.TinyArray(jsonData).getTinyArray();
			enyo.log('after get tiny array: ' + this.items.length);
			this.index = 0;
			this.$.mediaList.setCenterView(this.getView(this.index, 'center'));

		}
	},
	components: [{
		name: 'mediaList',
		kind: 'newness.Carousel',
		style: 'vertical-align: middle;',
		fit: true,
		onGetLeft: 'getLeft',
		onGetRight: 'getRight',
		style: "width:100%;height:100%;background: gray;"
	}],
	getView: function(index, left) {
		var that = this;
		enyo.log('getView ' + index + left);
		if (this.items && this.items.length > index && index >= 0) {
			return {
				kind: 'io.TinyGrid',
				items: this.items[index]
			}
		} else {
			if (index < 0) {
				//show switch
				return {
					kind: 'io.QuickLaunch',
					onItemTap: function(inSender, inEvent) {
						that.fetch(inSender.content);
						that.$.mediaList.next();
					}
				};
			} else {
				//show load more or anything else
				return {
					content: 'NEXT'
				};
			}
		}
	},
	getLeft: function(inSender, inEvent) {
		enyo.log('getLeft ' + this.index);
		if (inEvent.snap) {
			enyo.log('snap-->');
		}
		if (this.noData()) {
			this.$.mediaList.newView(inEvent.originator, this.loading());
			return false;
		}
		inEvent.snap && this.index--;
		if (this.index == - 1) {
			this.index = 0;
			return false;
		}
		this.$.mediaList.newView(inEvent.originator, this.getView(this.index - 1, 'left'));
		return true;
	},
	getRight: function(inSender, inEvent) {
		enyo.log('getRight ' + this.index);
		if (inEvent.snap) {
			enyo.log('snap-->');
		}
		if (this.index == this.items.length - 1) {
			return false;
		}
		if (this.noData()) {
			this.$.mediaList.newView(inEvent.originator, this.loading());
			return false;
		}
		inEvent.snap && this.index++;
		this.$.mediaList.newView(inEvent.originator, this.getView(this.index + 1, 'right'));
		return true;
	},
	loading: function() {
		return {
			content: 'loading..'
		};
	},
	noData: function() {
		return this.items && this.items.length == 0;
	},
	/*
	components: [{
		name: 'mediaList',
		kind: 'newness.FlyweightCarousel',
		fit: true,
		onSetupView: 'setupView'
	}],
	*/
	setupView: function(inSender, inEvent) {
		enyo.log('onSetupView: ' + inEvent.viewIndex);
		//inEvent.originator.setContent(inEvent.viewIndex);
		inEvent.originator.setContent('what');
		enyo.log('onSetupView: end ');
		return true;
		if (inEvent.viewIndex >= 0 && inEvent.viewIndex < this.items.length) {
			inEvent.originator.setHeader('Hello! ' + inEvent.viewIndex);
			return true;
		}
	}
});


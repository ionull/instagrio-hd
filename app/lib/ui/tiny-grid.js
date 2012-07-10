enyo.kind({
	name: 'io.TinyGrid',
	kind: enyo.Control,
	items: [],
	style: "width:100%;height:100%;background: yellow;padding:0;margin:0;",
	create: function() {
		this.inherited(arguments);
		this.renderItems(this.items);
	},
	renderItems: function(items) {
		if (items) {
			enyo.log('setItems' + items.length);
			switch (items.length) {
			case 4:
				this.createComponents([{
					kind:
					'io.Tiny4Img',
					src: items[0].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[1].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[2].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[3].images.low_resolution.url
				}]);
				break;
			case 3:
				this.createComponents([{
					kind:
					'io.Tiny4Img',
					src: items[0].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[1].images.low_resolution.url
				},
				{
					kind: 'io.TinyH2Img',
					src: items[2].images.standard_resolution.url
				}]);
				break;
			case 2:
				this.createComponents([{
					kind:
					'io.TinyV2Img',
					src: items[0].images.standard_resolution.url
				},
				{
					kind: 'io.TinyV2Img',
					src: items[1].images.standard_resolution.url
				}]);
				break;
			case 1:
				this.createComponent({
					kind:
					'io.Tiny1Img',
					src: items[0].images.standard_resolution.url
				});
				break;
			default:
				return;
			}
			/*
			this.createComponent({
				tag: 'div',
				style: 'clear: both;'
			});
			*/
		}
	}
});

enyo.kind({
	name:
	'io.Tiny4Img',
	tag: 'img',
	style: 'width: 50%;height:50%;float:left;background: blue;',
	content: '',
	create: function() {
		this.inherited(arguments);
	}
});

enyo.kind({
	name: 'io.TinyH2Img',
	tag: 'img',
	style: 'width: 100%;height:50%;float:left;background: red;',
	content: '',
	create: function() {
		this.inherited(arguments);
	}
});

enyo.kind({
	name: 'io.TinyV2Img',
	tag: 'img',
	style: 'width: 50%;height:100%;float:left;background: green;',
	content: '',
	create: function() {
		this.inherited(arguments);
	}
});

enyo.kind({
	name: 'io.Tiny1Img',
	tag: 'img',
	style: 'width: 100%;height:100%;float:left;background: black;',
	content: '',
	create: function() {
		this.inherited(arguments);
	}
});

enyo.kind({
	name: 'io.TinyArray',
	kind: null,
	constructor: function(items) {
		enyo.log('on TinyArray create: ' + items.length);
		this.items = items;
	},
	getTinyArray: function() {
		var items = this.items;
		enyo.log('getTinyArray: ' + items.length);
		var tinyArray = [];
		for (var i = 0; i < items.length;) {
			var tiny = [];
			var tinyCount = items.length - i;
			if (tinyCount >= 4) {
				tinyCount = Math.floor(Math.random() * 4) + 1;
				enyo.log('tiny count more than 4, random count: ' + tinyCount);
			} else {
				enyo.log('tiny count less than 4, left count: ' + tinyCount);
			}
			var tinyIndex = 0;
			while (tinyIndex < tinyCount) {
				tiny.push(items[i + tinyIndex]);
				++tinyIndex;
			}
			i += tinyCount;
			tinyArray.push(tiny);
		}
		enyo.log('tinyArray made, count: ' + tinyArray.length);
		return tinyArray;
	}
});


enyo.kind({
	name: 'io.TinyGrid',
	kind: enyo.Control,
	items: [],
	style: "width:100%;height:100%;background: yellow;padding:0;margin:0;",
	create: function() {
		this.inherited(arguments);
		this.renderItems(this.items);
	},
	onItemHold: function() {
		enyo.log('onItemHold');
	},
	onItemTap: function(inSender, inEvent) {
		enyo.log('onItemTap');
		if (inSender.item) {
			enyo.log(JSON.stringify(inSender.item.images));
		}
	},
	renderItems: function(items) {
		if (items) {
			enyo.log('setItems' + items.length);
			switch (items.length) {
			case 4:
				for (var img4 in items) {
					this.createComponent({
						kind: 'io.Tiny4Img',
						item: items[img4]
					});
				};
				break;
			case 3:
				this.createComponents([{
					kind:
					'io.Tiny4Img',
					item: items[0]
				},
				{
					kind: 'io.Tiny4Img',
					item: items[1]
				},
				{
					kind: 'io.TinyH2Img',
					item: items[2]
				}]);
				break;
			case 2:
				//random v or h
				for (var img2 in items) {
					this.createComponent({
						kind: Math.random() > 0.5 ? 'io.TinyV2Img': 'io.TinyH2Img',
						item: items[img2]
					});
				}
				break;
			case 1:
				this.createComponent({
					kind:
					'io.Tiny1Img',
					item: items[0]
				});
				break;
			default:
				return;
			}
		}
	}
});

enyo.kind({
	name:
	'io.TinyImg',
	content: '',
	onresize: 'onResized',
	onResized: function() {
		enyo.log('onResized------->' + this.hasNode().offsetWidth);
	},
	create: function() {
		var resolution = this.item.images.standard_resolution;
		if (this.small) {
			this.src = this.item.images.low_resolution;
		}
		this.src = resolution.url;
		this.inherited(arguments);
		this.addStyles("float: left;overflow: hidden;");
		var that = this;
		var img = that.createComponent({
			tag: 'img',
			src: that.src
		});
		setTimeout(function() {
			enyo.log('width: ' + that.hasNode().offsetWidth);
			var allWidth = that.hasNode().offsetWidth;
			var allHeight = that.hasNode().offsetHeight;
			var w = allWidth > allHeight;
			//TODO width and height are equal so just do it simple with(w ? allWidth: allHeight)
			var style = (w ? 'width: 100%;': 'height:100%;') 
				+ 'vertical-align: middle;margin-top: ' 
				+ (allHeight - (w ? allWidth: allHeight)) / 2 + 'px;margin-left: '
				+ (allWidth - (w ? allWidth: allHeight)) / 2 + 'px;';
			img.addStyles(style);
		},
		10);
	},
	ontap: 'onItemTap',
	onMousehold: 'onItemHold'
});

enyo.kind({
	name: 'io.Tiny4Img',
	kind: 'io.TinyImg',
	style: 'width: 50%;height:50%;background: blue;',
	small: true
});

enyo.kind({
	name: 'io.TinyH2Img',
	kind: 'io.TinyImg',
	style: 'width: 100%;height:50%;background: red;'
});

enyo.kind({
	name: 'io.TinyV2Img',
	kind: 'io.TinyImg',
	style: 'width: 50%;height:100%;background: green;'
});

enyo.kind({
	name: 'io.Tiny1Img',
	kind: 'io.TinyImg',
	style: 'width: 100%;height:100%;background: black;'
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
				tiny.push(items[i + tinyIndex]); ++tinyIndex;
			}
			i += tinyCount;
			tinyArray.push(tiny);
		}
		enyo.log('tinyArray made, count: ' + tinyArray.length);
		return tinyArray;
	}
});


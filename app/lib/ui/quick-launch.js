enyo.kind({
	name: 'io.QuickLaunch',
	kind: enyo.Control,
	create: function() {
		this.inherited(arguments);
	},
	style: 'width: 100%;height: 100%',
	components: [{
		item: 'HOME',
		kind: 'io.QuickItem'
	}, {
		item: 'HOT',
		kind: 'io.QuickItem'
	}, {
		item: 'MINE',
		kind: 'io.QuickItem'
	}, {
		item: 'LIKED',
		kind: 'io.QuickItem'
	}]
});

enyo.kind({
	name: 'io.QuickItem',
	tag: 'div',
	content: '',
	style: 'width: 50%;height: 50%;float: left;',
	create: function() {
		this.inherited(arguments);
		enyo.log('on quick item create ' + this.item);
		var color = 'red';
		switch(this.item) {
			case 'HOME':
				color = 'blue';
				break;
			case 'HOT':
				color = 'red';
				break;
			case 'MINE':
				color = 'green';
				break;
			case 'LIKED':
				color = 'orange';
				break;
			default:
				break;
		}
		this.addStyles("background: " + color + ";");
		this.createComponent({
			tag: 'p',
			content: this.item,
			style: 'font-size: 64px;position:relative;right:10px;bottom:0px;text-align:right;color: white;'
		});
	},
	ontap: 'onItemTap'
});

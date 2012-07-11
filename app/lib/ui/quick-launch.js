enyo.kind({
	name: 'io.QuickLaunch',
	kind: enyo.Control,
	create: function() {
		this.inherited(arguments);
	},
	style: 'width: 100%;height: 100%',
	components: [{
		content: 'HOME',
		kind: 'io.QuickItem'
	}, {
		content: 'HOT',
		kind: 'io.QuickItem'
	}, {
		content: 'MINE',
		kind: 'io.QuickItem'
	}, {
		content: 'LIKED',
		kind: 'io.QuickItem'
	}]
});

enyo.kind({
	name: 'io.QuickItem',
	style: 'width: 50%;height: 50%;float: left;vertical-align: middle;',
	create: function() {
		this.inherited(arguments);
		var color = 'red';
		switch(this.content) {
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
	},
	ontap: 'onItemTap'
});

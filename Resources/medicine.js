var win = Titanium.UI.currentWindow;

var android = Ti.Platform.name == 'android';
// var db = Titanium.Database.open('meditracker');

var label_height = android ? 20 : 20
var text_field_height = android ? 45 : 35;
var top = android ? 10 : 10;
var left = android ? 10 : 10;
var width = 250;

var l1 = Titanium.UI.createLabel({
	text: win.title + ' ' + win.pk,
	height: label_height,
	width:'auto',
	shadowColor:'#aaa',
	shadowOffset:{x:5,y:5},
	color:'#535252',
	font:{fontSize:14},
	top: top,
	left: left,
	width: width,
});

top += label_height;

win.add(l1);

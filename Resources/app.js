// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// It is safe to call this method multiple times since
// this method will only install once if it doesn't already exist on the device.
var db = Titanium.Database.install('../meditracker.db', 'meditracker');
db.execute('CREATE TABLE IF NOT EXISTS medicine (ID INTEGER PRIMARY KEY, NAME VARCHAR(64))');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    url :'timings.js',
	title: 'Medicine Timings',
    backgroundColor:'#181818'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Timings',
    window:win1
});


var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

// Do not add label to window
// win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
	url: 'add.js',
	title: 'Add Medicine',
    backgroundColor:'#181818'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Add',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

// Do not add label to window
// win2.add(label2);

var win3 = Titanium.UI.createWindow({
	// title: '',
	backgroundColor: '#181818'
});
var tab3 = Titanium.UI.createTab({
	title: 'Edit',
	window:win3
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  


// open tab group
tabGroup.open();

tabGroup.setActiveTab(0); 
// open tab group with a transition animation
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

db.close()
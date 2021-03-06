// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// It is safe to call this method multiple times since
// this method will only install once if it doesn't already exist on the device.
var db = Titanium.Database.open('meditracker');
db.execute('CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY, name VARCHAR, dosage VARCHAR, remind BOOLEAN);');
db.execute('CREATE TABLE IF NOT EXISTS medicine_timing (medicine INTEGER, medicine_time TIME, am_pm VARCHAR, FOREIGN KEY (medicine) REFERENCES medicine(id));');
db.execute('CREATE TABLE IF NOT EXISTS medicine_stock (medicine INTEGER, place VARCHAR, quantity INTEGER, FOREIGN KEY (medicine) REFERENCES medicine(id));');

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
    icon:'images/time_icon.png',
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
    backgroundColor:'#ffffff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'images/add_icon.png',
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
	url: 'stock.js',
	title: 'Stock',
	backgroundColor: '#ffffff'
});
var tab3 = Titanium.UI.createTab({
	icon:'images/stock_icon.png',
	title: 'Stock',
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

db.close();

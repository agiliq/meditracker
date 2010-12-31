var win = Titanium.UI.currentWindow;

var android = Ti.Platform.name == 'android';

var label_height = android ? 20 : 20
var text_field_height = android ? 45 : 35;
var button_height = android ? 45 : 35;
var top = android ? 10 : 10;
var left = android ? 10 : 10;
var width = 250;

var l1 = Titanium.UI.createLabel({
	text: 'Medicine Name',
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

var medicine_name = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: top,
	left: left,
	width: width,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(l1);
win.add(medicine_name);

top += text_field_height

var l2 = Titanium.UI.createLabel({
	text: 'Dosage',
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

var dosage = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: top,
	left: left,
	width: width,
	// value: 'foo bar',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(l2);
win.add(dosage);

top += text_field_height

/* ATTACH TIME PICKER & LABEL */
var time_label = Ti.UI.createLabel({
	text:'Timing',
	top: top,
	left: left,
	width:'auto',
	height: label_height,
	textAlign:'center',
	color: '#535252'
});
win.add(time_label);

top += label_height
var value = new Date();
// value.setMinutes(10);
// value.setHours(13);
// value.setSeconds(48);

var medicine_time = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_TIME,
	value:value,
	top: top,
	left: left,
	height: 'auto'
});
// height of time picker approximated to 130
top += 130

// turn on the selection indicator (off by default)
medicine_time.selectionIndicator = true;

win.add(medicine_time);

medicine_time.addEventListener('change',function(e)
{
	time_label.text = e.value;
});


/* ATTACH BUTTON */
var button = Titanium.UI.createButton({
	title:'Save',
	top: top,
	width: width - 50,
	height: button_height
});
win.add(button);

button.addEventListener('click', function() { 
	var medicine = medicine_name.value;
	var dose = dosage.value;
	var time_1 = medicine_time.value;
	var db = Titanium.Database.install('../meditracker.db', 'meditracker');
	db.execute('INSERT INTO medicine (name) values (?)', medicine);
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': medicine}).show();
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': dose}).show();
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': time_1}).show();
	Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': db.lastInsertRowId}).show();
	db.close();	
});

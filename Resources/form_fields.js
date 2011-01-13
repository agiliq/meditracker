
/* MEDICINE LABEL */
var medicine_name_label = Titanium.UI.createLabel({
	text: 'Medicine Name',
	height: label_height,
	//shadowColor:'#aaa',
	//shadowOffset:{x:5,y:5},
	color: label_color,
	font:{fontSize:14},
	top: y_top,
	left: left,
	width: width
});
y_top += label_height;

/* MEDICINE FIELD */
var medicine_name = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: y_top,
	left: left,
	width: width,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
y_top += text_field_height;

/* ADD MEDICINE LABEL AND FIELD TO WINDOW */ 
win.add(medicine_name_label);
win.add(medicine_name);


/* DOSAGE LABEL */
var dosage_label = Titanium.UI.createLabel({
	text: 'Dosage',
	height: label_height,
	//shadowColor:'#aaa',
	//shadowOffset:{x:5,y:5},
	color: label_color,
	font:{fontSize:14},
	top: y_top,
	left: left,
	width: width
});
y_top += label_height;

/* DOSAGE FIELD */
var dosage = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: y_top,
	left: left,
	width: width,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
y_top += text_field_height;

/* ADD DOSAGE LABEL AND FIELD TO WINDOW */ 
win.add(dosage_label);
win.add(dosage);


/* TIME LABEL */
var time_label = Ti.UI.createLabel({
	text:'Timing',
	top: y_top,
	left: left,
	width: width,
	height: label_height,
	color: label_color,
	font:{fontSize:14}
});
y_top += label_height;

/* TIME FIELD */
var time = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: y_top,
	left: left,
	width: width,
	// value: 'foo bar',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
y_top += text_field_height;

/* ADD TIME LABEL AND FIELD TO WINDOW */ 
win.add(time_label);
win.add(time);

/* FOCUS EVENT LISTNER ON TIME FIELD */
time.addEventListener('focus',function(e)
{
	Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': 'Display a time picker popup on focus'}).show();
	// time_label.text = e.value;
});


/* TIME PICKER */
var value = new Date();
var medicine_time = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_TIME,
	value:value,
	top: y_top,
	left: left,
	height: 'auto'
});
// turn on the selection indicator (off by default)
medicine_time.selectionIndicator = true;


/* STOCK LABEL */
var stock_label = Ti.UI.createLabel({
	text:'Stock',
	top: y_top,
	left: left,
	width: width,
	height: label_height,
	color: label_color,
	font:{fontSize:14}
});
y_top += label_height;

/* STOCK FIELD */
var stock = Titanium.UI.createTextField({
	color:'#336699',
	height: text_field_height,
	top: y_top,
	left: left,
	width: width,
	// value: 'foo bar',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	//keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
});
y_top += text_field_height;

/* ADD STOCK LABEL AND FIELD TO WINDOW */ 
win.add(stock_label);
win.add(stock);


/* ATTACH BUTTON */
var button = Titanium.UI.createButton({
	title:'Save',
	top: y_top + 10,
	width: width - 50,
	height: button_height
});
win.add(button);


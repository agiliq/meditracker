
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

var time_now = new Date();
var hours = time_now.getHours();
var minutes = time_now.getMinutes();
if (hours > 12) { 
	var ampm = 'PM';
	hours = hours - 12;
} else {
	var ampm = 'AM';
}

/* FOCUS EVENT LISTNER ON TIME FIELD */
time.addEventListener('focus', function() {
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': 'Display a time picker popup on focus'}).show();
	var modal_window = 	Titanium.UI.createWindow({
		backgroundColor: '#cccccc',
		setTransparency: 50
	});
	stock.focus();
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_TIME,
		top: android ? 40 : 10,
		setTransparency: 50
	});
	picker.selectionIndicator = true;
	var ok_button = Titanium.UI.createButton({
		title: 'Ok',
		width: 100,
		height: 30,
		top: android ? 170: 240
		//left: 20,
	});
	picker.addEventListener('change', function(e){
		if (e.value) {
			var selected_time = new Date(e.value);
		} else {
			var selected_time = new Date();
		}
		hours = selected_time.getHours();
		if (hours > 12) {hours = hours - 12;}
		if (hours == 0) {hours = 12;}
		minutes = pad(selected_time.getMinutes(), 2);
		ampm = selected_time.getHours() > 11 ? 'PM':'AM';
		time.value = hours + ':' + minutes + ':00 ' + ampm;
	});
	ok_button.addEventListener('click', function(){
		if (!hours) {
			picker.fireEvent('change');
		};
		modal_window.close();
		stock.focus();
	});
	var cancel_button = Titanium.UI.createButton({
		title: 'Cancel',
		width: 100,
		height: 30,
		top: android ? 170 : 240,
		left: 140
	});
	cancel_button.addEventListener('click', function(){
		modal_window.close();
		dosage.focus();
	});
	modal_window.add(picker);
	modal_window.add(ok_button);
	//modal_window.add(cancel_button);
	modal_window.open({modal: true, navBarHidden:true});
	// time_label.text = e.value;
});


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
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
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


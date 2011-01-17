var win = Titanium.UI.currentWindow;

/*
var label_color = '#535252';
var label_height = android ? 20 : 20;
var text_field_height = android ? 45 : 35;
var button_height = android ? 45 : 35;
var width = 250;
*/

Titanium.include('constants.js');
// STARTING TOP PADDING OF THE LAYOUT 
var y_top = android ? 10 : 10;
// STARTING LEFT PADDING OF THE LAYOUT 
var left = android ? 10 : 10;


Titanium.include('form_fields.js');

win.addEventListener('focus', function(e){
	// do nothing
});

button.addEventListener('click', function() { 
	var medicine = medicine_name.value;
	var med_dosage = dosage.value;
	// TODO: INCLUDE A REMIND FIELD IN THE WINDOW
	// AND TAKE THE VALUE FROM THE FIELD
	var remind = 0; 
	// TODO: INCLUDE A TIME PICKER AND TAKE 
	// TIME AND AM_PM VALUE FROM IT
	var med_time = hours + ':' + minutes + ':00';
	var am_pm = ampm;
	var med_stock = stock.value;
	
	var db = Titanium.Database.open('meditracker');
	
	db.execute('INSERT INTO medicine (name, dosage, remind) VALUES (?, ?, ?)', medicine, med_dosage, remind);
	
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': medicine}).show();
	var med_id = db.lastInsertRowId;
	db.execute('INSERT INTO medicine_timing (medicine, medicine_time, am_pm) VALUES (?, ?, ?)', med_id, med_time, am_pm);
	
    db.execute('INSERT INTO medicine_stock (medicine, place, quantity) VALUES (?, "home", ?)', med_id, med_stock);
    
	db.close();
	
	var notify_time = new Date();
	if (am_pm == 'PM') {
		if (hours < 12) {hours += 12};
	}
	if (am_pm == 'AM') {
		if (hours == 12) {hours = 0};
	}
	notify_time.setHours(hours);
	notify_time.setMinutes(minutes);
	if (!android) {
		Titanium.App.iOS.scheduleLocalNotification({
			alertAction: 'Take Medicine',
			alertBody: 'Time to take medicine, ' + medicine,
			sound: 'pop.caf',
			repeat: 'daily',
			date: notify_time
		});
	}
	
	var tabGroup =  win.getTabGroup();
	tabGroup.setActiveTab(0);
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': 'all over'}).show();
});

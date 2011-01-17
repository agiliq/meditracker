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

var db = Titanium.Database.open('meditracker');
var row1 = db.execute('select * from medicine where id = ?', win.pk);
var row2 = db.execute('select * from medicine_stock where medicine = ?', win.pk);
var row3 = db.execute('select * from medicine_timing where medicine = ?', win.pk);

medicine_name.value = row1.fieldByName('name');
dosage.value = row1.fieldByName('dosage');
// remind.value = row1.fieldByName('remind'); // == 1) ? 'Yes' : 'No'],
stock.value = row2.fieldByName('quantity');
time.value = row3.fieldByName('medicine_time') + ' ' + row3.fieldByName('am_pm');

var med_current_time = row3.fieldByName('medicine_time').split(':');
hours = med_current_time[0];
minutes = med_current_time[1];
ampm = row3.fieldByName('am_pm');

row1.close();
row2.close();
row3.close();

db.close();

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
	
	db.execute('UPDATE medicine SET name = ?, dosage = ?, remind = ? WHERE id = ?', medicine, med_dosage, remind, win.pk);
	
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': medicine}).show();

	db.execute('UPDATE medicine_timing SET medicine_time = ?, am_pm = ? WHERE medicine = ?', med_time, am_pm, win.pk);
	
    db.execute('UPDATE medicine_stock SET place = ?, quantity = ? WHERE medicine = ?', 'home', med_stock, win.pk);
    
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
		Ti.App.iOS.scheduleLocalNotification({
			alertAction: 'Take Medicine',
			alertBody: 'Time to take medicine, ' + medicine,
			sound: 'pop.caf',
			repeat: 'daily',
			date: notify_time
		});
	}
	
	var tabGroup =  win.getTabGroup();
	tabGroup.setActiveTab(2);
	//Titanium.UI.createAlertDialog({'title': 'MediTracker', 'message': 'all over'}).show();
});
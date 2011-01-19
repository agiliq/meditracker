Titanium.include('constants.js');

var win = Titanium.UI.currentWindow;

win.addEventListener('focus', function(e){
	
	var db = Titanium.Database.open('meditracker');
	var row1 = db.execute('select * from medicine where id = ?', win.pk);
	var row2 = db.execute('select * from medicine_stock where medicine = ?', win.pk);
	var row3 = db.execute('select * from medicine_timing where medicine = ?', win.pk);
	
	var row_height = 40;
	var column_width = platform_width/2;
	var y_top = top_margin;
	
	var data = [
		['Name', row1.fieldByName('name')], 
		['Dosage', row1.fieldByName('dosage')], 
		['Remind', (row1.fieldByName('remind') == 1) ? 'Yes' : 'No'],
		['Stock', row2.fieldByName('quantity')],
		['Timing', row3.fieldByName('medicine_time') + ' ' + row3.fieldByName('am_pm')]
	];
	
	for (row in data) {
		var row_data = data[row];
		var left = 0;
		var bg_color = ['#fff', '#ccc'][row%2];
		var col_1 = Titanium.UI.createLabel({
			text: row_data[0],
			height: row_height,
			color:'#535252',
			backgroundColor: bg_color,
			font:{fontSize:14},
			top: y_top,
			left: left,
			width: column_width
		});
		
		left += column_width;
		
		var col_2 = Titanium.UI.createLabel({
			text: row_data[1],
			height: row_height,
			color:'#535252',
			backgroundColor: bg_color,
			font:{fontSize:14, fontWeight: 'bold'},
			top: y_top,
			left: left,
			width: column_width
		});
	
		y_top += row_height;
		win.add(col_1);
		win.add(col_2);
	};
	
	row1.close();
	row2.close();
	row3.close();
	
	db.close();
	
	/* ATTACH BUTTON */
	var edit_button = Titanium.UI.createButton({
		title: 'Edit',
		top: y_top + 10,
		width: platform_width/2 - 20,
		left: 10,
		height: button_height
	});
	win.add(edit_button);
	
	
	edit_button.addEventListener('click', function(e) {
		// Titanium.UI.createAlert
		var new_win = Titanium.UI.createWindow({
			url: 'edit.js',
			title: 'Edit Medicine',
			backgroundColor: '#ffffff',
			pk: win.pk
		});
		Titanium.UI.currentTab.open(new_win, {animated:true});
	});
		
	var delete_button = Titanium.UI.createButton({
		title: 'Delete',
		top: y_top + 10,
		width: platform_width/2 - 20,
		left: platform_width/2 + 10,
		height: button_height,
		color: 'red'
	});
	win.add(delete_button);
	
	delete_button.addEventListener('click', function(e) {
		var dialog = Titanium.UI.createOptionDialog({
			title: 'Delete Medicine', 
			options: ['Cancel','Delete'],
		    destructive: 1,
		    cancel: 0
		});
		dialog.show();
		dialog.addEventListener('click', function(e){
			if (e.destructive == e.index){
				var db = Titanium.Database.open('meditracker');
				db.execute('DELETE FROM medicine WHERE id = ?', win.pk);
				db.execute('DELETE FROM medicine_stock WHERE medicine = ?', win.pk);
				db.execute('DELETE FROM medicine_timing WHERE medicine = ?', win.pk);
				// TODO: REMOVE THE LOCAL NOTIFICATIONS OF THE MEDICINE
				db.close();
				win.close();
			}
		});
	});
});
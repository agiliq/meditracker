window = Titanium.UI.currentWindow;
Titanium.include('constants.js');


// create table view data object
window.addEventListener('focus', function(e){
	
	var row_height = 40;
	var column_width = platform_width/2;
	var y_top = top_margin;
	
	var data = [];
	
	var db = Titanium.Database.open('meditracker');
	
	var rows = db.execute('select * from medicine');
	
	while (rows.isValidRow())
	{
		var stock_row = db.execute('select * from medicine_stock where medicine = ?', rows.fieldByName('id'));
		data.push([rows.fieldByName('name'), stock_row.fieldByName('quantity')]);
		stock_row.close();
		rows.next();
	}
	rows.close();
	db.close();
	
		
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
		window.add(col_1);
		window.add(col_2);
	};
	

});
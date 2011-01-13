
window = Titanium.UI.currentWindow;
// create table view data object
window.addEventListener('focus', function(e){

	var data = [];

	var db = Titanium.Database.install('../meditracker.db', 'meditracker');
	
	var rows = db.execute('select * from medicine');
	
	while (rows.isValidRow())
	{
		data.push({pk: rows.field(0), title: rows.fieldByName('name'), hasChild: true, url:'medicine.js'});
		rows.next();
	}
	rows.close();
	
	
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e) {
		if (e.rowData.url) {
			var win = Titanium.UI.createWindow({
				url:e.rowData.url,
				title: e.rowData.title,
				backgroundColor: '#ffffff',
				pk: e.rowData.pk
			});
			Titanium.UI.currentTab.open(win, {animated:true});
		}
	});
	
	// add table view to the window
	window.add(tableview);
	
	db.close();
});
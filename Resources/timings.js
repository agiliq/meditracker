
// create table view data object
var data = [];

var db = Titanium.Database.open('meditracker');

var rows = db.execute('select * from medicine');

while (rows.isValidRow())
{
	data.push({pk: rows.field(0), title: rows.fieldByName('name'), hasChild: false, test:'medicine.js'});
	rows.next();
}
rows.close();


// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	if (e.rowData.test) {
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title: e.rowData.title,
			backgroundColr: '#181818',
			pk: e.rowData.pk
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
// win1.add(tableview);

Titanium.UI.currentWindow.add(tableview);

db.close();
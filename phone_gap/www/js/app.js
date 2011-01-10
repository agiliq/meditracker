/* GET URL PARAMETERS FROM REQUEST
http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html */

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

/* PHONE-GAP DB API */
// Populate the database 
//
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY, name VARCHAR, dosage VARCHAR, remind BOOLEAN)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine_timing (medicine INTEGER, medicine_time TIME, am_pm VARCHAR, FOREIGN KEY (medicine) REFERENCES medicine(id))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine_stock (medicine INTEGER, place VARCHAR, quantity INTEGER, FOREIGN KEY (medicine) REFERENCES medicine(id))');
}

// Query the database
//
function showList(tx) {
    tx.executeSql('SELECT * FROM medicine', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowsAffected);
    // the number of rows returned by the select statement
    var len = results.rows.length;
    console.log("medicine table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).name);
        var row_item = results.rows.item(i);
        $('div.list ul').append('<li><a href=details.html?med_id=' + row_item.id + '>' +  row_item.name +'</a></li>');
    }

}

// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.message);
    console.log("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
	// window.openDatabase("db_name", "version", "display name", db size in bytes);
    var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
    db.transaction(queryDB, errorCB);
}

function showDetails(med_id) {
	console.log(med_id);
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var render = function (tx, results) {
		console.log('in render');
		console.log('results :' + results);
		var len = results.rows.length;
    	console.log("medicine table: " + len + " rows found.");
    	for (var i=0; i<len; i++){
       		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).name);
        	var row_item = results.rows.item(i);
        	$('div.list').append('<p>Medicine Name is :' +  row_item.name +'</p>');
        };
	};
	var select = function (tx) {
		console.log('in select...');
		tx.executeSql('SELECT * FROM medicine WHERE id = "' + med_id + '"', [], render, errorCB);
	};
	db.transaction(select);
	console.log('done');
};

function editMedicine(med_id) {
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var populate_form = function(tx, results) {
		var row_item = results.rows.item(0);
		var form = $('form#edit_form');
		form.children('input[name="med_name"]').val(row_item.name);
		form.children('input[name="dosage"]').val(row_item.dosage);
		if (row_item.remind == 1) {
			$('input[name="remind"][value="yes"]', '#edit_form').attr('checked', true);
		} else { 
			$('input[name="remind"][value="no"]', '#edit_form').attr('checked', true);
		};
		console.log('Edit ' + row_item.data);
	};
	var select = function (tx) {
		console.log('in select...');
		tx.executeSql('SELECT * FROM medicine WHERE id = "' + med_id + '"', [], populate_form, errorCB);
	};
	db.transaction(select);
};

$(function(){
	$('form#add_form').submit(function () {
		var med_name = $(this).children('input[name="med_name"]').val();
		var dosage = $(this).children('input[name="dosage"]').val();
		var hours = $(this).children('input[name="hours"]').val();
		var minutes = $(this).children('input[name="minutes"]').val();
		var am_pm = $(this).children('input[name="am_pm"]').val();
		//if (am_pm == 'pm')
		//	hours += 12;
			
		var time = hours + minutes + ':00';
		var stock = $(this).children('input[name="stock"]').val();
		var remind = $('input[name="remind"]:checked', this).val() == 'yes' ? 1 : 0;
		console.log(med_name);
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var insert = function (tx) {
			tx.executeSql('INSERT INTO medicine (name, dosage, remind) VALUES ("' + med_name + '", "' + dosage + '", "' + remind + '")');
			console.log('last inset id ' + db.lastInsertRowId);
			tx.executeSql('INSERT INTO medicine_timing (medicine, medicine_time, am_pm) VALUES (1, "' + time + '", "' + am_pm + '")');
			tx.executeSql('INSERT INTO medicine_stock (medicine, place, quantity) VALUES (1, "home", "' + stock + '")');
		};
		db.transaction(insert, errorCB);
		console.log('last last insert id ' + db.lastInsertRowId);
		console.log('done');
		return false;
	});
	
	$('form#edit_form').submit(function () {
		var med_id = $.getUrlVar('med_id');
		var med_name = $(this).children('input[name="med_name"]').val();
		var dosage = $(this).children('input[name="dosage"]').val();
		var hours = $(this).children('input[name="hours"]').val();
		var minutes = $(this).children('input[name="minutes"]').val();
		var am_pm = $(this).children('input[name="am_pm"]').val();
		if (am_pm == 'pm')
			hours += 12;
			
		var time = hours + minutes + ':00';
		var stock = $(this).children('input[name="stock"]').val();
		var remind = $('input[name="remind"]:checked', this).val() == 'yes' ? 1 : 0;
		console.log(med_name);
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var insert = function (tx) {
			tx.executeSql('UPDATE medicine SET data="' + med_name + '" WHERE id = "' + med_id + '"');
		};
		db.transaction(insert);
		console.log('done');
		return false;
	});
});
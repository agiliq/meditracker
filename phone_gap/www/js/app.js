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
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY, data)');
    //tx.executeSql('INSERT INTO DEMO (data) VALUES ("First row")');
    //tx.executeSql('INSERT INTO DEMO (data) VALUES ("Second row")');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowsAffected);
    // the number of rows returned by the select statement
    console.log("Insert ID = " + results.rows.length);
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        var row_item = results.rows.item(i);
        $('div.list ul').append('<li><a href=details.html?med_id=' + row_item.id + '>' +  row_item.data +'</a></li>');
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
    	console.log("DEMO table: " + len + " rows found.");
    	for (var i=0; i<len; i++){
       		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        	var row_item = results.rows.item(i);
        	$('div.list').append('<p>Medicine Name is :' +  row_item.data +'</p>');
        };
	};
	var select = function (tx) {
		console.log('in select...');
		tx.executeSql('SELECT * FROM DEMO WHERE id = "' + med_id + '"', [], render, errorCB);
	};
	db.transaction(select);
	console.log('done');
};

function editMedicine(med_id) {
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var populate_form = function(tx, results) {
		var row_item = results.rows.item(0);
		var form = $('form#edit_form');
		form.children('input[name="med_name"]').val(row_item.data);
		console.log('Edit ' + row_item.data);
	};
	var select = function (tx) {
		console.log('in select...');
		tx.executeSql('SELECT * FROM DEMO WHERE id = "' + med_id + '"', [], populate_form, errorCB);
	};
	db.transaction(select);
};

$(function(){
	$('form#add_form').submit(function () {
		var med_name = $(this).children('input[name="med_name"]').val();
		console.log(med_name);
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var insert = function (tx) {
			tx.executeSql('INSERT INTO DEMO (data) VALUES ("' + med_name + '")');
		};
		db.transaction(insert);
		console.log('done');
		return false;
	});
	
	$('form#edit_form').submit(function () {
		var med_id = $.getUrlVar('med_id');
		var med_name = $(this).children('input[name="med_name"]').val();
		console.log(med_name);
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var insert = function (tx) {
			tx.executeSql('UPDATE DEMO SET data="' + med_name + '" WHERE id = "' + med_id + '"');
		};
		db.transaction(insert);
		console.log('done');
		return false;
	});
});
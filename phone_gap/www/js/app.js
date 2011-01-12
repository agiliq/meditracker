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

function log(message) {
	console.log(message);
};

function dummySuccessHandler(tx, results){
	// dummy Success Handler
};
function dropTables(tx){
	tx.executeSql('DROP TABLE medicine');
	tx.executeSql('DROP TABLE medicine_timing');
	tx.executeSql('DROP TABLE medicine_stock');
};

function createDB(tx) {
	// dropTables(tx);
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY, name VARCHAR, dosage VARCHAR, remind BOOLEAN)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine_timing (medicine INTEGER, medicine_time TIME, am_pm VARCHAR, FOREIGN KEY (medicine) REFERENCES medicine(id))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS medicine_stock (medicine INTEGER, place VARCHAR, quantity INTEGER, FOREIGN KEY (medicine) REFERENCES medicine(id))');
}

// Query the database
function showList(tx) {
    tx.executeSql('SELECT * FROM medicine', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {
	console.log('results object', results)
    // the number of rows returned by the select statement
    var len = results.rows.length;
    console.log("medicine table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).name + "item " + results.rows.item(i));
        var row_item = results.rows.item(i);
        $('div.list ul').append('<li><a href=details.html?med_id=' + row_item.id + '>' +  row_item.name +'</a></li>');
    }
    if (len == 0) {
    	$('div.list').append('<p>There are no medicines in the list, <a href="add.html">add medicines now</a></p>');
    }

}

// Transaction error callback
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.message);
}

// Transaction success callback
function successCB() {
	// window.openDatabase("db_name", "version", "display name", db size in bytes);
    var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
    db.transaction(queryDB, errorCB);
}

function showDetails(med_id) {
	console.log(med_id);
	var table = $('table#med_details')
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var render = function (tx, results) {
		console.log('in render');
		var len = results.rows.length;
    	
        var row_item = results.rows.item(0);
        $('td#med_name', table).text(row_item.name);
        $('td#med_dosage', table).text(row_item.dosage);
    };
	var render_stock = function (tx, results){
		var row_item = results.rows.item(0);
		log('render stock details');
		$('td#med_stock', table).text(row_item.quantity);
	};
	var render_time = function (tx, results){
		var row_item = results.rows.item(0);
		log('render time details');
		$('td#med_time', table).text(row_item.medicine_time + ' ' + row_item.am_pm);
		$('div.list').append("<a href='edit.html?med_id=" + med_id + "'>Edit</a>");
		$('div.list').append(" | <a href='delete.html?med_id=" + med_id + "'>Delete</a>");
	};
	var select = function (tx) {
		console.log('in select...');
		tx.executeSql('SELECT * FROM medicine WHERE id = ?', [med_id], render, errorCB);
		tx.executeSql('SELECT * FROM medicine_stock WHERE medicine = ?', [med_id], render_stock, errorCB);
		tx.executeSql('SELECT * FROM medicine_timing WHERE medicine = ?', [med_id], render_time, errorCB);
	};
	db.transaction(select);
	console.log('done');
};



function deleteMedicine(med_id) {
	console.log(med_id);
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var delete_med = function (tx) {
		console.log('in delete...');
		tx.executeSql('DELETE FROM medicine_stock WHERE medicine = ?', [med_id], dummySuccessHandler, errorCB);
		tx.executeSql('DELETE FROM medicine_timing WHERE medicine = ?', [med_id], dummySuccessHandler, errorCB);
		tx.executeSql('DELETE FROM medicine WHERE id = ?', [med_id], function(){alert('Deleted Medicine');window.location='index.html';}, errorCB);
	};
	db.transaction(delete_med);
	console.log('done');
};

function editMedicine(med_id) {
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	var form = $('form#edit_form');
	var populate_form = function(tx, results) {
		log('populating name');
		var row_item = results.rows.item(0);
		form.children('input[name="med_name"]').val(row_item.name);
		form.children('input[name="dosage"]').val(row_item.dosage);
		if (row_item.remind == 1) {
			$('input[name="remind"][value="yes"]', '#edit_form').attr('checked', true);
		} else { 
			$('input[name="remind"][value="no"]', '#edit_form').attr('checked', true);
		};
	};
	var populate_time = function(tx, results) {
		log('populating time');
		var row_item = results.rows.item(0);
		var med_time = row_item.medicine_time.split(':');
		var hours = med_time[0];
		var minutes = med_time[1];
		form.children('select[name="hours"]').val(hours);
		form.children('select[name="minutes"]').val(minutes);
		form.children('select[name="am_pm"]').val(am_pm);
	};
	var populate_stock = function(tx, results) {
		log('populating stock');
		var row_item = results.rows.item(0);
		form.children('input[name="stock"]').val(row_item.quantity);
	};
	var select = function (tx) {
		tx.executeSql('SELECT * FROM medicine WHERE id = ?', [med_id], populate_form, errorCB);
		tx.executeSql('SELECT * FROM medicine_stock WHERE medicine = ?', [med_id], populate_stock, errorCB);
		tx.executeSql('SELECT * FROM medicine_timing WHERE medicine = ?', [med_id], populate_time, errorCB);
	};
	db.transaction(select);
};


function showStock(){
	log('show stock');
	var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
	
	var get_medicine_stock = function (tx, med_list) {
		var len = med_list.rows.length;
		log('Total Medicines = ' + len);
		
		for (i=0; i<len; i++) {
			var med_item = med_list.rows.item(i);
			log('Find stock for: ' + med_item.name + ' and id is ' + med_item.id);
			
			var log_med_stock = function (tx, med_stock, med_item) {
				var stock_item = med_stock.rows.item(0);
				//log('Med Name: ' + med_item.name + ' Med Stock ' + stock_item.quantity);
				$('table').append('<tr><td class="tab_contents">' + med_item.name + '</td><td align="center" class="tab_contents">' + stock_item.quantity + '</td></tr>');
			};
			
			var log_med = function(med_item){
				var x = function(tx, results) {
					log('med item in context is ' + med_item.name);
					log_med_stock(tx, results, med_item);
				};
				return x;
			};
			tx.executeSql('SELECT * FROM medicine_stock WHERE medicine = ?', [med_item.id], log_med(med_item), function(){log('getting stock for ' + med_item.id +' raised error');});
		};
		log('done getting stock');
	};
	
	var get_medicines = function(tx) {
		tx.executeSql('SELECT * FROM medicine', [], get_medicine_stock, function(){log('getting medicines raised error');});
	};
	db.transaction(get_medicines, function(){log('this transaction raised error');});
};

$(function(){
	$('form#add_form').submit(function () {
		var med_name = $(this).children('input[name="med_name"]').val();
		var dosage = $(this).children('input[name="dosage"]').val();
		var hours = $(this).children('select[name="hours"]').val();
		var minutes = $(this).children('select[name="minutes"]').val();
		var am_pm = $(this).children('select[name="am_pm"]').val();
		//if (am_pm == 'pm')
		//	hours += 12;	
		var med_time = hours + ':' + minutes + ':00';
		var stock = $(this).children('input[name="stock"]').val();
		var remind = $('input[name="remind"]:checked', this).val() == 'yes' ? 1 : 0;
		
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var insert_related = function (tx, results){
			var med_id = results.insertId;
			tx.executeSql('INSERT INTO medicine_timing (medicine, medicine_time, am_pm) VALUES (?, ?, ?)', [med_id, med_time, am_pm], dummySuccessHandler, errorCB);
			tx.executeSql('INSERT INTO medicine_stock (medicine, place, quantity) VALUES (?, "home", ?)', [med_id, stock], function(){window.location = 'index.html';}, errorCB);
		};
		var insert = function (tx) {
			tx.executeSql('INSERT INTO medicine (name, dosage, remind) VALUES (?, ?, ?)', [med_name, dosage, remind], insert_related, errorCB);
		};
		db.transaction(insert, errorCB);
		console.log('done');
		return false;
	});
	
	$('form#edit_form').submit(function () {
		var med_id = $.getUrlVar('med_id');
		var med_name = $(this).children('input[name="med_name"]').val();
		var dosage = $(this).children('input[name="dosage"]').val();
		var hours = $(this).children('select[name="hours"]').val();
		var minutes = $(this).children('select[name="minutes"]').val();
		var am_pm = $(this).children('select[name="am_pm"]').val();
		//if (am_pm == 'pm')
		//	hours += 12;
		
		var med_time = hours + ':' + minutes + ':00';
		console.log('H: ' + hours + ', M: ' + minutes + ', time: ' + med_time);
		var stock = $(this).children('input[name="stock"]').val();
		var remind = $('input[name="remind"]:checked', this).val() == 'yes' ? 1 : 0;
		var db = window.openDatabase("meditracker", "1.0", "Medi Tracker", 200000);
		var update = function (tx) {
			tx.executeSql('UPDATE medicine SET name = ?, dosage = ?, remind = ? WHERE id = ?', [med_name, dosage, remind, med_id], dummySuccessHandler, errorCB);
			tx.executeSql('UPDATE medicine_timing SET medicine_time = ?, am_pm = ? WHERE medicine = ?', [med_time, am_pm, med_id], dummySuccessHandler, errorCB);
			tx.executeSql('UPDATE medicine_stock SET quantity = ? WHERE medicine = ?', [stock, med_id], function(){window.location = 'details.html?med_id='+med_id;}, errorCB);
		};
		db.transaction(update);
		console.log('update done');
		return false;
	});
});
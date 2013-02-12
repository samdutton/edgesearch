// A basic set of functions for manipulating web databases

function displayError(message){
	console.log(message);
}

function transactionErrorHandler(error) {
    console.log("Transaction error: " + error.message + ", code: " + error.code);
}

function transactionSuccessHandler() {
    console.log("Transaction successful.");
}

function queryErrorHandler(transaction, error) {
	if (error.message === "constraint failed") {
		alert("Constraint failed.");
	} else {
	    displayError("Sorry. Something went wrong: " + error.message + ", code: " + error.code +
			".\n Sam Dutton would appreciate if you could email this error to sam.dutton@gmail.com.");
	}

    return false;
}

function showResults(transaction, results) {
//    console.log(results);
	if (results.rows && results.rows.length > 0) {
		var i, message = "", prop;
		for (i = 0; i !== results.rows.length; ++i) {
			message += "Item " + i + "\n";
			var row = results.rows.item(i);
			for (prop in row) {
				if (row.hasOwnProperty(prop)) {
					message += prop + ": " + row[prop] + "\n";
				}
			}
			message += "\n";
		}
		if (message !== "") {
			console.log(message);
		}
	} else {
        alert("No results")
    }
}

function handleResults(tx, results, callback) {
	callback(results.rows);
}

// see also doReadQuery() below
function doQuery(statement, querySuccessHandler, parameters) {
	db.transaction(function (tx) {
		tx.executeSql(statement, parameters, querySuccessHandler, queryErrorHandler);
	}, transactionErrorHandler, transactionSuccessHandler);
}

// uses Database readTransaction() method, supposedly faster than transaction()
// but not supported by (e.g.) Safari 4.0.5 on Windows XP
function doReadQuery(statement, querySuccessHandler, parameters) {
	var transactionFunction = db.readTransaction ? db.readTransaction : db.transaction;
	transactionFunction.apply(db, [function(tx){tx.executeSql(statement,
		parameters, querySuccessHandler, queryErrorHandler)},
		transactionErrorHandler, null]); // null instead of transactionSuccessHandler
}


function getData(statement, callback) {
	doReadQuery(statement,
		function(tx, results) { // query success handler
			handleResults(tx, results, callback);
	});
}



/*
 * tryCatch
 * Substitute for a try/catch block
 * @param {Function} test Represents the "try" block in the format of a function
 * @param {Function} fail Represents the "catch" block in the format of a function
 */

(function(win){
	"use strict";
	
	//Define the variable for the callback so we can preserve "catch" functions for the onerror handler
	var callback = null, 
	//If a previous handler is alread bound to the window.onerror event, copy it for later so behaviour can default to it
	handler = win.onerror;
	
	//Define the tryCatch function
	win.tryCatch = function(tryFn, catchFn){
		//Cache the "catch" function
		callback = catchFn;
		//Run the "try" function
		tryFn();
		//Nullify the reference to the fail function so as not to confuse the onerror handler
		callback = null;
	};
	
	//Define a handler function for window.onerror
	win.onerror = function(msg, file, line, col, err){
		//Use the error object if provided, otherwise create it
		var error = err || new Error(), suppress;
		//Add properties to error object to uniform functionality across browsers
		error.message = msg;
		error.fileName = file;
		error.lineNumber = line;
		//If the callback exists, the error must have happened in the context of the tryCatch function
		if(callback){
			//Run the callback function and retrieve the value for suppression
			suppress = callback(error);
			//Nullify the callback so as not to confuse future events
			callback = null;
			//If the callback returned false then allow the error to propagate to the browser, otherwise suppress it like a native try/catch block would
			return suppress === false ? false : true;
		}
		//Handler must not have been invoked in the context of the tryCatch function.
		//If a previous event handler was bound to window.onerror then invoke it now and return.
		//Otherwise, fallback to default behaviour and allow the error to propagate to the browser by returning false
		return handler ? handler.apply(win, arguments) : false;
	};
	
})(this);
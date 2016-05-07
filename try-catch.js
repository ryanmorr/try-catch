/*
 * Experimental alternative to a try/catch block
 * 
 * @param {Function} tryFn
 * @param {Function} catchFn
 */
function tryCatch(tryFn, catchFn) {
    // Activate strict mode
    'use strict';
    // Cache current `onerror` callback
    var prev = window.onerror;
    // Define a new callback for global `onerror` events
    window.onerror = function(msg, file, line, col, err) {
        // Restore original `onerror` callback
        window.onerror = prev;
        // If the error object was not provided, than create it
        var error = err || new Error();
        // uniform error properties across browsers
        error.message = msg;
        error.fileName = file;
        error.lineNumber = line;
        error.columnNumber = col;
        // Invoke the "catch" function passing the error object
        var suppress = catchFn(error);
        // If the callback returned false then allow the error to 
        // propagate to the browser, otherwise suppress it like a native 
        // try/catch block would
        return suppress === false ? false : true;
    };
    // Invoke the "try" function
    tryFn();
    // Restore original `onerror` callback
    window.onerror = prev;
}
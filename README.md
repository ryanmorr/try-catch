# tryCatch

Alternative to the try/catch block that offers greater performance benefits in some circumstances and customized functionality. Please be advised, this is an expertimental project, use at your own risk.

## Concept

The solution leverages the `window.onerror` event as a means of detecting runtime errors including any errors that you explicitly throw yourself. The event is also able to closely mimic the error suppression of a catch block by returning false from `window.onerror`, while returning true allows the error to propagate to the browser.

Please refer to [http://www.ryanmorr.com/reinventing-the-try-catch-block](http://www.ryanmorr.com/reinventing-the-try-catch-block) for more detailed information regarding this project.

## Usage

The function has two required parameters, the first being a "try" function to test code, the second being a "catch" function which will be invoked and passed an error object if an exception is raised.

```javascript
tryCatch(function(){
	// try something   
}, function(error){
	// handle error
});
```
	
Returning false in the "catch" function will allow the error to propagate to the browser. Returning anything else or nothing at all will suppress the error.

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

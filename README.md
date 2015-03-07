# tryCatch

Emulates a native try/catch block for customized functionality and greater performance benefits in some circumstances. Please refer to the [blog post](http://www.ryanmorr.com/reinventing-the-try-catch-block) for more detailed information regarding this project. Be advised, this is an expertimental project, use at your own risk.

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

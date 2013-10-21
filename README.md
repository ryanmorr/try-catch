## tryCatch

Alternative to the try/catch block that offers greater performance benefits in some circumstances and customized functionality. Please be advised, this is an expertimental project, refer to the [blog post](http://www.ryanmorr.com/reinventing-the-try-catch-block) to read more.

### Example

The function has two required parameters, the first being a "try" function to test code, the second being a "catch" function which will be invoked and provided an error object if an exception is raised.

```javascript
tryCatch(function(){
	// try something   
}, function(error){
	// handle error
});
```
	
Returning false in the "catch" function will allow the error to propagate to the browser. Returning anything else or nothing at all will suppress the error.

### Browser Support

- Firefox
- Internet Explorer
- Chrome
- Safari
- Opera
- Android
- iOS

### License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

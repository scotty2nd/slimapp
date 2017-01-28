var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");
var data = Observable();

var areCredentialsValid = Observable(function() {
	var credentials = username.value != "" && password.value != "";
	console.log('all crendetials entered: ' + credentials);
	return credentials;
});

function click(args) {
    //console.log(JSON.stringify(args));
    console.log('clicked');
    console.log(username.value);
    console.log(password.value);

    var requestObject = {email: username.value, password: password.value};
	var status = 0;
	var response_ok = false;

  	fetch('http://slimapp.dev/api/login', {
	  	method: 'POST',
	  	headers: { "Content-type": "application/json", "Accept": "application/json" },
	  	body: JSON.stringify(requestObject)
  	}).then(function(response) {
    	status = response.status;  // Get the HTTP status code
		response_ok = response.ok; // Is response.status in the 200-range?

	  	console.log("Status Code " + status);
	  	console.log("Response OK " + response_ok);

		return response.json();    // This returns a promise
  	}).then(function(responseObject) {
	    // Do something with the result
	    console.log('do something');
		console.log(responseObject.error);
	    console.log(responseObject.message);

	    data.value = responseObject;

	    username.value = '';		//Set Field to blank
	    password.value = '';
      	//debugger;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    console.log(error);
	    //debugger;
	});
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}

module.exports = {
	username: username,
	password: password,
	areCredentialsValid: areCredentialsValid,
	click: click,
	data: data,
	goToRegisterPage: goToRegisterPage
};
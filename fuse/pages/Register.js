//var Customer = require("modules/Customer");
var Observable = require("modules/Observable");
var RegisterObservable = require("FuseJS/Observable");

var username = RegisterObservable("");
var password = RegisterObservable("");
var passwordRepeat = RegisterObservable("");
var email = RegisterObservable("");
//var data = Observable();

var areCredentialsValid = RegisterObservable(function() {
	var credentials = username.value != "" && email.value != "" && password.value != "" && passwordRepeat.value != "";
	/*console.log('all crendetials entered: ' + credentials);*/
	return credentials;
});

function click() {
    console.log('clicked');
    console.log(username.value);
    console.log(email.value);
    console.log(password.value);
    console.log(passwordRepeat.value);

    var requestObject = {first_name: 'first_name', last_name: 'last_name', password: 'pw', phone: '1234', email: 'email', address: "Test Streert",
city: "Testtown", state: "BZW"};
	var status = 0;
	var response_ok = false;

	fetch('http://slimapp.dev/api/customer/add', {
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
	    email.value = '';
	    password.value = '';
	    passwordRepeat.value = '';
      	//debugger;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    //debugger;
	    //console.log('ERROR ' . error.message);
	});
}

function goBack() {
	console.log('goBack');
    router.goBack();
}

module.exports = {
	username: username,
	email: email,
	password: password,
	passwordRepeat: passwordRepeat,
	areCredentialsValid: areCredentialsValid,
	click: click,
	//data: data,
	goBack: goBack
};
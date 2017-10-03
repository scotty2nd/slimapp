//var Customer = require("modules/Customer");
var Observable = require("modules/Observable");
var RegisterObservable = require("FuseJS/Observable");

var Firstname = RegisterObservable("");
var Lastname = RegisterObservable("");
var Email = RegisterObservable("");
var Password = RegisterObservable("");
var RepeatPassword = RegisterObservable("");
//var data = Observable();

var areCredentialsValid = RegisterObservable(function() {
	var credentials = Firstname.value != "" && Lastname.value != "" && Password.value != "" && RepeatPassword.value != "";
	//console.log('all crendetials entered: ' + credentials);
	return credentials;
});

function register() {
    console.log('clicked');
    console.log(Firstname.value);
    console.log(Lastname.value);
    console.log(Email.value);
    console.log(Password.value);
    console.log(RepeatPassword.value);

    var requestObject = {first_name: Firstname.value, last_name: Lastname.value, password: Password.value, phone: '', email: Email.value, address: '',
city: '', state: ''};
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
	Firstname: Firstname,
	Lastname: Lastname,
	Email: Email,
	Password: Password,
	RepeatPassword: RepeatPassword,

	areCredentialsValid: areCredentialsValid,
	register: register,
	goBack: goBack
	//data: data,
};
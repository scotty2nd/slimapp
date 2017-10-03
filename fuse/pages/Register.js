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

    var requestObject = {
    	first_name: Firstname.value, 
    	last_name: Lastname.value, 
    	password: Password.value, 
    	email: Email.value
    };

	fetch('http://slimapp.dev/api/customer/add', {
	  	method: 'POST',
	  	headers: { "Content-type": "application/json", "Accept": "application/json" },
	  	body: JSON.stringify(requestObject)
  	}).then(function(response) {
	  	return response.json();    // This returns a promise
  	}).then(function(data) {
	    // Do something with the result
	    console.log('do something');
	    console.log(data.error);
	    console.log(data.message);

	    Firstname.value = '';		//Set Field to blank
	    Lastname.value = '';
	    Email.value = '';
	    Password.value = '';
	    RepeatPassword.value = '';

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
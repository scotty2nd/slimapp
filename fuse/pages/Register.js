var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");
var passwordRepeat = Observable("");
var email = Observable("");
var data = Observable();

var areCredentialsValid = Observable(function() {
	return username.value != "" && email.value != "" && password.value != "" && passwordRepeat.value != "";
});

function click() {
    //console.log(JSON.stringify(args));
    console.log('clicked');
    console.log(username.value);
    console.log(email.value);
    console.log(password.value);
    console.log(passwordRepeat.value);

    var requestObject = {first_name: username.value, last_name: 'last_name', password: password.value, phone: '1234', email: email.value, address: "Test Streert",
city: "Testtown", state: "BZW"};
	var status = 0;
	var response_ok = false;

  	//fetch('http://rest.learncode.academy/api/johnbob/friends', {
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
	  	//return response;
  	}).then(function(responseObject) {
	    // Do something with the result
	    console.log('do something');

	    console.log(responseObject.error);
	    console.log(responseObject.message);
	    data.value = responseObject;
	    //data.value = responseObject.id; //Nur die ID in Value speichern
	    //debug_log(data.value);
	    username.value = '';
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
	data: data,
	goBack: goBack
};
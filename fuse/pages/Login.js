var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");
var data = Observable();

var areCredentialsValid = Observable(function() {
	var test = username.value != "" && password.value != "";
	console.log(test);
	return test;
});

function click(args) {
    //console.log(JSON.stringify(args));
    console.log('clicked');
    console.log(username.value);
    console.log(password.value);

    var requestObject = {name: 'Billy Bob', age: '27'};
	var status = 0;
	var response_ok = false;

  	fetch('http://rest.learncode.academy/api/johnbob/friends', {
	  	method: 'POST',
	  	headers: { "Content-type": "application/json", "Accept": "application/json" },
	  	body: JSON.stringify(requestObject)
  	}).then(function(response) {
	    	status = response.status;  // Get the HTTP status code
		response_ok = response.ok; // Is response.status in the 200-range?
	  	console.log("1");
	  	/*console.log(response_ok);
	  	console.log(response.json());
	  	console.log(response);
	  	console.log(JSON.stringify(response.json()));*/
	  	return response.json();    // This returns a promise

	  	/*var errors = JSON.stringify(response.responseJSON);
	  	console.log(errors);

	  	if (response.status === 422) {
	  		errors.forEach(function(error) {
		  		console.log(error);
	  		});
	  	}*/
  	}).then(function(responseObject) {
	    // Do something with the result
	    console.log('do something');
	    //data.value = responseObject.id; //Nur die ID in Value speichern
	    data.value = responseObject;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    console.log(error);
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
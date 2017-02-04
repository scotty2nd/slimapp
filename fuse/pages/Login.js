var context = require("modules/context");
var observable = require("modules/observable");

function click() {
    console.log('clicked');
    console.log(observable.username.value);
    console.log(observable.password.value);

    var requestObject = {email: observable.username.value, password: observable.password.value};
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
		console.log('Error: ' + responseObject.error);
	    console.log('Message: ' + responseObject.message);
	    console.log('ID: ' + responseObject.id);
	    console.log('API Key: ' + responseObject.apikey);
	    //debugger;

	    if((responseObject.id != "" || responseObject.id != null) && (responseObject.apikey != "" || responseObject.apikey != null)){
    		console.log('gotoHome');
    		context.addHike(responseObject.id, responseObject.apikey, responseObject.error, responseObject.message, '1', 'comments1');
    		router.push("home");
	    }

	    //observable.data.value = responseObject;
	    /*customerIdentifiers = responseObject;
	    console.log(customerIdentifiers.message);
	    console.log();*/

	    //Reset Fields
	    observable.username.value = '';
	    observable.password.value = '';
      	//debugger;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    //console.log(error);
	    //debugger;
	});
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}

function save() {
	console.log('save clicked');
	console.log(observable.username.value);
	context.addHike('id1', observable.username.value, 'location1', '12', '1', 'comments1');
}

function goToHike(arg) {
    var hike = arg.data;
    router.push("home", hike);
}

module.exports = {
	hikes: context.hikes,
	username: observable.username,
	password: observable.password,
	data: observable.data,
	//username: username,
	//password: password,
	//areCredentialsValid: areCredentialsValid,
	//click: click,
	//data: data,
	click: click,
	areCredentialsValid: observable.areCredentialsValid,

	goToRegisterPage: goToRegisterPage,
	save: save,
	goToHike: goToHike
};
var context = require("modules/context");
var observable = require("modules/observable");
//var data = Observable();

/*function click() {
    console.log('clicked');
    //console.log(dataObs);
    //debugger;
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
	  	//console.log(response.json());
		return response.json();    // This returns a promise
  	}).then(function(responseObject) {
	    // Do something with the result
	    console.log('do something');
		console.log(responseObject.error);
	    console.log(responseObject.message);
	    console.log(responseObject.id);
	    console.log(responseObject.apikey);
	    //debugger;

	    if((responseObject.id != "" || responseObject.id != null) && (responseObject.apikey != "" || responseObject.apikey != null)){
    		console.log('gotoHome')
    		router.push("home");
	    }

	    //data.value = responseObject;
	    customerIdentifiers = responseObject;
	    console.log(customerIdentifiers.message);
	    console.log();
	    debugger;

	    //Reset Fields
	    username.value = '';
	    password.value = '';
      	//debugger;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    console.log(error);
	    //debugger;
	});
}*/

/*function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}*/

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
	//username: username,
	//password: password,
	//areCredentialsValid: areCredentialsValid,
	//click: click,
	//data: data,
	//goToRegisterPage: goToRegisterPage,
	//getCustomerIdentifiers: getCustomerIdentifiers,
	areCredentialsValid: observable.areCredentialsValid,
	save: save,
	goToHike: goToHike
};
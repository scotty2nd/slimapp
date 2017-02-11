var Customer = require("modules/Customer");
var Observable = require("modules/LoginObservable");

/** Für das Modal **/
var isPasswordInvalid = Observable.Password.map(function(value) {
		console.log('PW Length: ' + value.length);
        return value.length < 6;
});

/** Für das Modal Ende **/

function click() {
    console.log('clicked');
    console.log(Observable.Username.value);
    console.log(Observable.Password.value);

    var requestObject = {email: Observable.Username.value, password: Observable.Password.value};
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

	    if(responseObject.id != "" && responseObject.apikey != "" && responseObject.error == false){
    		console.log('gotoHome & addCustomerIdentifier');
    		Observable.ResponseData.value = responseObject;
    		debugger;

    		Customer.addIdentifier(responseObject.error, responseObject.message, responseObject.id, responseObject.apikey);
    		router.push("home");

		    //Reset Fields
		    Observable.Username.value = '';
		    Observable.Password.value = '';
	    }

      	//debugger;
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	});
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}

//Da kein Button mehr kann das gelöscht werden
/*function save() {
	console.log('save clicked');
	console.log(observable.username.value);
	context.addHike('id1', observable.username.value, 'location1', '12', '1', 'comments1');
}

function goToHike(arg) {
    var hike = arg.data;
    router.push("home", hike);
}*/

module.exports = {
	Identifier: Customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden
	Username: Observable.Username,
	Password: Observable.Password,
	isPasswordInvalid: isPasswordInvalid,

	areCredentialsValid: Observable.areCredentialsValid,

	click: click,
	goToRegisterPage: goToRegisterPage
};
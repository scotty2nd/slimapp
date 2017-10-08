var Observable = require("modules/Observable");
var RegisterObservable = require("FuseJS/Observable");

var Firstname = RegisterObservable("");
var Lastname = RegisterObservable("");
var Email = RegisterObservable("");
var Password = RegisterObservable("");
var RepeatPassword = RegisterObservable("");

var areCredentialsValid = RegisterObservable(function() {
	var credentials = Firstname.value != "" && Lastname.value != "" && Password.value != "" && RepeatPassword.value != "";
	return credentials;
});

function register() {
    console.log('clicked');
	Observable.ShowOverlay.value = true; // Overlay einblenden
	Observable.ShowLoadingIndicator.value = true; // Loading Symbol einblenden

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
	    // Server Antwort verarbeiten
	    if(data.error == false){
		    console.log('do something');
		    console.log(data.error);
		    console.log(data.message);

    		Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
    		Observable.ShowModal.value = true; // Error Modal einblenden
			Observable.ModalMessage.value = data.message; // Error Modal Text setzen

			debugger;

		    Firstname.value = '';		//Set Field to blank
		    Lastname.value = '';
		    Email.value = '';
		    Password.value = '';
		    RepeatPassword.value = '';
		}else if(data.error == true){
	    	Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
    		Observable.ShowModal.value = true; // Error Modal einblenden
			Observable.ModalMessage.value = data.message; // Error Modal Text setzen
	    }
	}).catch(function(error) {
	    // An error occurred somewhere in the Promise chain
	    console.log('error');
	    Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
		Observable.ShowModal.value = true; // Error Modal einblenden
		Observable.ModalMessage.value = "Ein unbekannter Fehler ist aufgetreten."; // Error Modal Text setzen
	});
}

function goBack() {
    router.goBack();
}

module.exports = {
	Firstname: Firstname,
	Lastname: Lastname,
	Email: Email,
	Password: Password,
	RepeatPassword: RepeatPassword,

	ShowOverlay: Observable.ShowOverlay,
	ShowLoadingIndicator: Observable.ShowLoadingIndicator,
	ShowModal: Observable.ShowModal,
	ModalMessage: Observable.ModalMessage,

	areCredentialsValid: areCredentialsValid,
	register: register,
	goBack: goBack
	//data: data,
};
var Customer = require("modules/Customer");
var Observable = require("modules/Observable");
var LoginObservable = require("FuseJS/Observable");

var Username = LoginObservable("");
var Password = LoginObservable("");

var allCredentialsEntered = LoginObservable(function() {
	var credentials = Username.value != "" && Password.value != "";
	return credentials;
});

function login() {
	Observable.ShowOverlay.value = true; // Overlay einblenden
	Observable.ShowLoadingIndicator.value = true; // Loading Symbol einblenden

    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex um auf gültige Email Adressen zu prüfen

	// Email Adresse ist eingegeben, gültig und Passwort ist eingegeben
	if(regex.test(Username.value) && Password.value != ""){
		var requestObject = {
			email: Username.value, 
			password: Password.value
		};

	  	fetch('http://app.scotty2nd.square7.ch/api/login', {
		  	method: 'POST',
		  	headers: { "Content-type": "application/json", "Accept": "application/json" },
		  	body: JSON.stringify(requestObject)
	  	}).then(function(response) {
			return response.json(); // This returns a promise
	  	}).then(function(data) {
		    // Server Antwort verarbeiten
		    if(data.id != "" && data.apikey != "" && data.error == false){ // Prüfe ob ID und der API Kkey gefüllt ist sowie kein Fehler existiert 
	    		Customer.addIdentifier(data.error, data.message, data.id, data.apikey); // ID und API Key abspeichern

	    		Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
	    		Observable.ShowOverlay.value = false; // Overlay ausblenden

	    		router.push("home"); // Weiterleiten auf Home Seite

			    Username.value = '';  // Reset Field
			    Password.value = '';  // Reset Field
		    }else if(data.error == true){
		    	Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
	    		Observable.ShowModal.value = true; // Error Modal einblenden
				Observable.ModalMessage.value = data.message; // Error Modal Text setzen
		    }
		}).catch(function(error) {
		    // An error occurred somewhere in the Promise chain
		    Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
			Observable.ShowModal.value = true; // Error Modal einblenden
			Observable.ModalMessage.value = "Ein unbekannter Fehler ist aufgetreten."; // Error Modal Text setzen
		});
	}else{
		// Email Adresse ist ungültig
		Observable.ShowLoadingIndicator.value = false // Loading Symbol ausblenden
		Observable.ShowModal.value = true; // Error Modal einblenden
		Observable.ModalMessage.value = "Bitte E-Mail-Adresse und/oder Passwort eingeben."; // Error Modal Text setzen
	}
}

function goToRegisterPage() {
    router.push("register");
}

function goToForgotPasswordPage() {
	console.log('goToForgotPassword');
    router.push("forgotPassword");
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
	Username: Username,
	Password: Password,

	ShowOverlay: Observable.ShowOverlay,
	ShowLoadingIndicator: Observable.ShowLoadingIndicator,
	ShowModal: Observable.ShowModal,
	ModalMessage: Observable.ModalMessage,
	Identifier: Customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden

	allCredentialsEntered: allCredentialsEntered,
	login: login,
	goToRegisterPage: goToRegisterPage,
	goToForgotPasswordPage: goToForgotPasswordPage
};
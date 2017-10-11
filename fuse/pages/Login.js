var Observable = require("modules/Observable"),
	Customer = require("modules/Customer");
	
var LoginObservable = require("FuseJS/Observable");

var Username = LoginObservable(""),
	Password = LoginObservable("");

var allCredentialsEntered = LoginObservable(function() {
	var credentials = Username.value != "" && Password.value != "";
	
	Observable.setAndroidStatusbarColor(credentials, 1);

	return credentials;
});

function onPageActiv() {
	Observable.setAndroidStatusbarColor(allCredentialsEntered);
}

function login() {
	Observable.ShowOverlay.value = true; // Overlay einblenden
	Observable.ShowLoadingIndicator.value = true; // Loading Symbol einblenden

	// Email Adresse ist eingegeben, gültig und Passwort ist eingegeben
	if(Observable.EmailRegex.test(Username.value) && Password.value != ""){
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

				Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
				Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
				Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
				Observable.Modal.Message.value = data.message; // Modal Text setzen
				Observable.Modal.Visibility.value = true; // Modal sichtbar machen
		    }
		}).catch(function(error) {
		    // An error occurred somewhere in the Promise chain
		    Observable.ShowLoadingIndicator.value = false; // Loading Symbol ausblenden

			Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
			Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
			Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
			Observable.Modal.Message.value = "Ein unbekannter Fehler ist aufgetreten."; // Modal Text setzen
			Observable.Modal.Visibility.value = true; // Modal sichtbar machen
		});
	}else{
		// Email Adresse ist ungültig
		Observable.ShowLoadingIndicator.value = false; // Loading Symbol ausblenden

		Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
		Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
		Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
		Observable.Modal.Message.value = "Bitte E-Mail-Adresse und/oder Passwort eingeben."; // Modal Text setzen
		Observable.Modal.Visibility.value = true; // Modal sichtbar machen
	}
}

function goToRegisterPage() {
    router.push("register");
}

function goToForgotPasswordPage() {
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
	Modal: Observable.Modal,
	Identifier: Customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden

	allCredentialsEntered: allCredentialsEntered,
	onPageActiv, onPageActiv,
	login: login,
	goToRegisterPage: goToRegisterPage,
	goToForgotPasswordPage: goToForgotPasswordPage
};
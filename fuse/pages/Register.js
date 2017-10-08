var Observable = require("modules/Observable");
var RegisterObservable = require("FuseJS/Observable");

var Firstname = RegisterObservable(""),
	Lastname = RegisterObservable(""),
	Email = RegisterObservable(""),
	Password = RegisterObservable(""),
	RepeatPassword = RegisterObservable("");

var areCredentialsValid = RegisterObservable(function() {
	var credentials = Firstname.value != "" && Lastname.value != "" && Password.value != "" && RepeatPassword.value != "";
	return credentials;
});

function register() {
	/*
		To Do:
		- Email Adresse prüfen / Email Adress Prüfung in Funktion auslagern
		- Passwort und Repeatpasswort prüfen
		- Passwort Komplexität einbauen
		- Nutzungs- und Datenschutzschutz Popup bauen
		- Console.logs entfernen
	*/
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
			
			Observable.Modal.Background = Observable.Colors.Success; // Modal Hintergrundfarbe setzen 
			Observable.Modal.Headline = ""; // Modal Dachzeile setzen
			Observable.Modal.Title = "Glückwunsch"; // Modal Titel setzen
			Observable.Modal.Message.value = data.message; // Modal Text setzen
			Observable.Modal.Visibility.value = true; // Modal sichtbar machen

		    Firstname.value = '';		//Set Field to blank
		    Lastname.value = '';
		    Email.value = '';
		    Password.value = '';
		    RepeatPassword.value = '';
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
	Modal: Observable.Modal,

	areCredentialsValid: areCredentialsValid,
	register: register,
	goBack: goBack
};
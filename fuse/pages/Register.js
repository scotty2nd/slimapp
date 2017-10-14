var Observable = require("modules/Observable");
var RegisterObservable = require("FuseJS/Observable");

var Firstname = RegisterObservable(""),
	Lastname = RegisterObservable(""),
	Email = RegisterObservable(""),
	Password = RegisterObservable(""),
	RepeatPassword = RegisterObservable("");

var allCredentialsEntered = RegisterObservable(function() {
	var credentials = Firstname.value != "" && Lastname.value != "" && Password.value != "" && RepeatPassword.value != "";

	Observable.setAndroidStatusbarColor(credentials, 1);

	return credentials;
});

function onPageActiv() {
	Observable.setAndroidStatusbarColor(allCredentialsEntered);
}

function register() {
	/*
		To Do:
		- Passwort Komplexität einbauen
		- Nutzungs- und Datenschutzschutz Popup bauen
		- Konstante für Host URL
		- Console.logs entfernen
	*/
	Observable.ShowOverlay.value = true; // Overlay einblenden
	Observable.ShowLoadingIndicator.value = true; // Loading Symbol einblenden

	if(Firstname.value != "" && Lastname.value != "" && Email.value != "" && Password.value != "" && RepeatPassword.value != ""){
		if(Observable.EmailRegex.test(Email.value)){
			if(Password.value == RepeatPassword.value){
			    var requestObject = {
			    	first_name: Firstname.value, 
			    	last_name: Lastname.value, 
			    	password: Password.value, 
			    	email: Email.value
			    };

				fetch('http://app.scotty2nd.square7.ch/api/customer/add', {
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
			}else{
				// Passwort nicht identisch
				Observable.ShowLoadingIndicator.value = false; // Loading Symbol ausblenden

				Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
				Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
				Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
				Observable.Modal.Message.value = "Die eingegebenen Passwörter stimmen nicht überein."; // Modal Text setzen
				Observable.Modal.Visibility.value = true; // Modal sichtbar machen
			}
		}else{
			// Email Adresse ist ungültig
			Observable.ShowLoadingIndicator.value = false; // Loading Symbol ausblenden

			Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
			Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
			Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
			Observable.Modal.Message.value = "Bitte geben Sie eine gültige Email-Adresse ein."; // Modal Text setzen
			Observable.Modal.Visibility.value = true; // Modal sichtbar machen
		}
	}else{
		// Nicht alle Felder ausgefüllt
		Observable.ShowLoadingIndicator.value = false; // Loading Symbol ausblenden

		Observable.Modal.Background = Observable.Colors.Error; // Modal Hintergrundfarbe setzen 
		Observable.Modal.Headline = "Oops!"; // Modal Dachzeile setzen
		Observable.Modal.Title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
		Observable.Modal.Message.value = "Bitte füllen Sie alle Felder aus."; // Modal Text setzen
		Observable.Modal.Visibility.value = true; // Modal sichtbar machen
	}
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

	allCredentialsEntered: allCredentialsEntered,
	onPageActiv, onPageActiv,
	register: register,
	goBack: goBack
};
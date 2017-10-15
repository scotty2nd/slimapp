var include = include = require("/Main");

var firstname = include.observable(""),
	lastname = include.observable(""),
	email = include.observable(""),
	password = include.observable(""),
	repeatPassword = include.observable("");

/*Eventuell in Observable Datei auslagern*/
var allCredentialsEntered = include.observable(function() {
	var credentials = firstname.value != "" && lastname.value != "" && password.value != "" && repeatPassword.value != "";

	include.SetAndroidStatusbarColor(credentials, 1);

	return credentials;
});

/*Passwort Feld überwachen und Passwort Komplexität prüfen und zurückgeben*/
var paasswordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(password.value);

	return passwordComplexity;
});

function OnPageActiv() {
	include.SetAndroidStatusbarColor(allCredentialsEntered);
}

function Register() {
	/*
		To Do:
		- Passwort Komplexität einbauen (in Arbeit, hier in der Funktion Check einbauen der mindestens medium erfordert)
		- Nutzungs- und Datenschutzschutz Popup bauen
		- Konstante für Host URL
		- Console.logs entfernen
		- Kommentare anpassen entweder alle in deutsch oder englisch
		- In register und login show Modal funktion anlegen um Code zu reduzieren
	*/
	include.showOverlay.value = true; // Overlay einblenden
	include.showLoadingIndicator.value = true; // Loading Symbol einblenden

	if(firstname.value != "" && lastname.value != "" && email.value != "" && password.value != "" && repeatPassword.value != ""){
		if(include.emailRegex.test(email.value)){
			if(password.value == repeatPassword.value){
				//Hier checken ob passwort mindestens medium ist
			    var requestObject = {
			    	first_name: firstname.value, 
			    	last_name: lastname.value, 
			    	password: password.value, 
			    	email: email.value
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
			    		include.showLoadingIndicator.value = false // Loading Symbol ausblenden
						
						include.modal.background = include.colors.success; // Modal Hintergrundfarbe setzen 
						include.modal.headline = ""; // Modal Dachzeile setzen
						include.modal.title = "Glückwunsch"; // Modal Titel setzen
						include.modal.message.value = data.message; // Modal Text setzen
						include.modal.visibility.value = true; // Modal sichtbar machen

					    firstname.value = '';		//Set Field to blank
					    lastname.value = '';
					    email.value = '';
					    password.value = '';
					    repeatPassword.value = '';
					}else if(data.error == true){
				    	include.showLoadingIndicator.value = false // Loading Symbol ausblenden

						include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
						include.modal.headline = "Oops!"; // Modal Dachzeile setzen
						include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
						include.modal.message.value = data.message; // Modal Text setzen
						include.modal.visibility.value = true; // Modal sichtbar machen
				    }
				}).catch(function(error) {
				    // An error occurred somewhere in the Promise chain
				    include.showLoadingIndicator.value = false; // Loading Symbol ausblenden

					include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
					include.modal.headline = "Oops!"; // Modal Dachzeile setzen
					include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
					include.modal.message.value = "Ein unbekannter Fehler ist aufgetreten."; // Modal Text setzen
					include.modal.visibility.value = true; // Modal sichtbar machen
				});
			}else{
				// Passwort nicht identisch
				include.showLoadingIndicator.value = false; // Loading Symbol ausblenden

				include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
				include.modal.headline = "Oops!"; // Modal Dachzeile setzen
				include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
				include.modal.message.value = "Die eingegebenen Passwörter stimmen nicht überein."; // Modal Text setzen
				include.modal.visibility.value = true; // Modal sichtbar machen
			}
		}else{
			// Email Adresse ist ungültig
			include.showLoadingIndicator.value = false; // Loading Symbol ausblenden

			include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
			include.modal.headline = "Oops!"; // Modal Dachzeile setzen
			include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
			include.modal.message.value = "Bitte geben Sie eine gültige Email-Adresse ein."; // Modal Text setzen
			include.modal.visibility.value = true; // Modal sichtbar machen
		}
	}else{
		// Nicht alle Felder ausgefüllt
		include.showLoadingIndicator.value = false; // Loading Symbol ausblenden

		include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
		include.modal.headline = "Oops!"; // Modal Dachzeile setzen
		include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
		include.modal.message.value = "Bitte füllen Sie alle Felder aus."; // Modal Text setzen
		include.modal.visibility.value = true; // Modal sichtbar machen
	}
}

function GoBack() {
    router.goBack();
}

module.exports = {
	firstname: firstname,
	lastname: lastname,
	email: email,
	password: password,
	repeatPassword: repeatPassword,

	showOverlay: include.showOverlay,
	showLoadingIndicator: include.showLoadingIndicator,
	modal: include.modal,

	allCredentialsEntered: allCredentialsEntered,
	paasswordComplexity: paasswordComplexity,
	
	OnPageActiv, OnPageActiv,
	Register: Register,
	GoBack: GoBack
};
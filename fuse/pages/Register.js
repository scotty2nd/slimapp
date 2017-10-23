var include = require("/Main");

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
var passwordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(password.value);

	return passwordComplexity;
});

/*Repeat Passwort Feld überwachen und Passwort Komplexität prüfen und zurückgeben*/
var repeatPasswordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(repeatPassword.value);

	return passwordComplexity;
});

function OnPageActiv() {
	include.SetAndroidStatusbarColor(allCredentialsEntered);
}

function Register() {
	/*
		To Do:
		- Kommentare anpassen entweder alle in deutsch oder englisch
		- Nutzungs- und Datenschutzschutz Popup bauen
		- Logo Untertitel einbauen (Mowi)
	*/
	include.showOverlay.value = true; // Overlay einblenden
	include.showLoadingIndicator.value = true; // Loading Symbol einblenden

	if(firstname.value != "" && lastname.value != "" && email.value != "" && password.value != "" && repeatPassword.value != ""){
		if(include.emailRegex.test(email.value)){
			if(password.value == repeatPassword.value){
				if((passwordComplexity.value == 'mittel' && repeatPasswordComplexity.value == 'mittel') || (passwordComplexity.value == 'stark' && repeatPasswordComplexity.value == 'stark')){

					var requestObject = {
				    	first_name: firstname.value, 
				    	last_name: lastname.value, 
				    	password: password.value, 
				    	email: email.value
				    };

					fetch(include.apiUrl + 'customer/add', {
					  	method: 'POST',
					  	headers: { "Content-type": "application/json", "Accept": "application/json" },
					  	body: JSON.stringify(requestObject)
				  	}).then(function(response) {
					  	return response.json();    // This returns a promise
				  	}).then(function(data) {
					    // Server Antwort verarbeiten
					    if(data.error == false){
					    	// Kein Fehler Daten an den Server schicken
				    		include.showLoadingIndicator.value = false // Loading Symbol ausblenden
				    		include.ShowModal(include.colors.success, '', 'Glückwunsch', data.message, true);
							
				    		// Textfelder löschen
						    firstname.value = '';
						    lastname.value = '';
						    email.value = '';
						    password.value = '';
						    repeatPassword.value = '';
						}else if(data.error == true){
							// Server Antwort enthält einen Fehler
					    	include.showLoadingIndicator.value = false // Loading Symbol ausblenden
					    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', data.message, true);
					    }
					}).catch(function(error) {
					    // An error occurred somewhere in the Promise chain
					    include.showLoadingIndicator.value = false; // Loading Symbol ausblenden
					    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten.', true);
					});
				}else{
					// Passwort nicht komplex genug
			    	include.showLoadingIndicator.value = false // Loading Symbol ausblenden
			    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Das eingegebenen Passwort ist nicht komplex genug.', true);
				}
			}else{
				// Passwort nicht identisch
				include.showLoadingIndicator.value = false; // Loading Symbol ausblenden
				include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Passwörter stimmen nicht überein.', true);
			}
		}else{
			// Email Adresse ist ungültig
			include.showLoadingIndicator.value = false; // Loading Symbol ausblenden
			include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Email-Adresse ist ungültig.', true);
		}
	}else{
		// Nicht alle Felder ausgefüllt
		include.showLoadingIndicator.value = false; // Loading Symbol ausblenden
		include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Bitte füllen Sie alle Felder aus.', true);
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
	passwordComplexity: passwordComplexity,
	repeatPasswordComplexity: repeatPasswordComplexity,
	
	OnPageActiv, OnPageActiv,
	Register: Register,
	GoBack: GoBack
};
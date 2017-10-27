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

// Passwort Feld überwachen und Passwort Komplexität zurückgeben
var passwordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(password.value);

	return passwordComplexity;
});

// Repeat Passwort Feld überwachen und Passwort Komplexität zurückgeben
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
		- Nutzungs- und Datenschutzschutz Popup bauen // In Komponente verlagern und dynamisch machen
		- Logo Untertitel einbauen (Mowi)
	*/
	include.showOverlay.value = true; 			// Overlay einblenden
	include.showLoadingIndicator.value = true; 	// Loading Symbol einblenden

	// Check ob alle Felder eingegeben sind
	if(firstname.value != "" && lastname.value != "" && email.value != "" && password.value != "" && repeatPassword.value != ""){
		// Prüfen ob Email-Adresse gültig ist
		if(include.emailRegex.test(email.value)){
			// Prüfen ob Passwort und Passwort wiederholen identisch sind
			if(password.value == repeatPassword.value){
				// Prüfen ob Passwort komplex genug ist
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
				    		include.showLoadingIndicator.value = false; 										// Loading Symbol ausblenden
				    		include.ShowModal(include.colors.success, '', 'Glückwunsch', data.message, true); 	// Erfolgsmeldung zeigen
							
				    		// Textfelder löschen
						    firstname.value = '';
						    lastname.value = '';
						    email.value = '';
						    password.value = '';
						    repeatPassword.value = '';
						}else if(data.error == true){
							// Server Antwort enthält einen Fehler
					    	include.showLoadingIndicator.value = false; 																// Loading Symbol ausblenden
					    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', data.message, true); 	// Fehlermeldung zeigen
					    }
					}).catch(function(error) {
					    // Ein Fehler ist bei der Verarbeitung aufgetreten
					    include.showLoadingIndicator.value = false; 																							// Loading Symbol ausblenden
					    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten.', true); 	// Fehlermeldung zeigen
					});
				}else{
					// Passwort nicht komplex genug
			    	include.showLoadingIndicator.value = false; 																									// Loading Symbol ausblenden
			    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Das eingegebenen Passwort ist nicht komplex genug.', true);	// Fehlermeldung zeigen
				}
			}else{
				// Passwort nicht identisch
				include.showLoadingIndicator.value = false; 																									// Loading Symbol ausblenden
				include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Passwörter stimmen nicht überein.', true); // Fehlermeldung zeigen
			}
		}else{
			// Email Adresse ist ungültig
			include.showLoadingIndicator.value = false; 																								// Loading Symbol ausblenden
			include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Email-Adresse ist ungültig.', true); 	// Fehlermeldung zeigen
		}
	}else{
		// Nicht alle Felder ausgefüllt
		include.showLoadingIndicator.value = false; 																					// Loading Symbol ausblenden
		include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Bitte füllen Sie alle Felder aus.', true); 	// Fehlermeldung zeigen
	}
}

function OpenPopup() {
	// Popup einblenden
	include.showPopup.value = true;
}

module.exports = {
	firstname: firstname,
	lastname: lastname,
	email: email,
	password: password,
	repeatPassword: repeatPassword,

	showOverlay: include.showOverlay,
	showLoadingIndicator: include.showLoadingIndicator,
	showPopup: include.showPopup,
	modal: include.modal,

	allCredentialsEntered: allCredentialsEntered,
	passwordComplexity: passwordComplexity,
	repeatPasswordComplexity: repeatPasswordComplexity,
	
	OnPageActiv, OnPageActiv,
	Register: Register,
	OpenPopup: OpenPopup
};
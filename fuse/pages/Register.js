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
		- Nutzungs- und Datenschutzschutz Popup bauen // Nutzungs und Datenschutzbedingugen von Server fetchen
		- Logo auf Login Seite ist aktuell zu hoch gerutscht
		- Popup Javascript in eigene Datei auslagern
		- Navbar Javascript in eigene Datei auslagern
		- Logo Untertitel einbauen (Mowi)
		- Go Back Tag einbauen um Javascript zu sparen siehe episode 3 
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
				  	})
				  	.then(result => result.json())
				  	.then(result => {
				  		if(result.error == false){
					    	// Kein Fehler Daten an den Server schicken
				    		include.showLoadingIndicator.value = false; 										// Loading Symbol ausblenden
				    		include.ShowModal(include.colors.success, '', 'Glückwunsch', result.message, true); 	// Erfolgsmeldung zeigen
							
				    		// Textfelder löschen
						    firstname.value = '';
						    lastname.value = '';
						    email.value = '';
						    password.value = '';
						    repeatPassword.value = '';
						}else if(result.error == true){
							// Server Antwort enthält einen Fehler
					    	include.showLoadingIndicator.value = false; 																// Loading Symbol ausblenden
					    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', result.message, true); 	// Fehlermeldung zeigen
					    }
					}).catch(error => {
					    // Ein Fehler ist bei der Verarbeitung aufgetreten
					    include.showLoadingIndicator.value = false; 																							// Loading Symbol ausblenden
					    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten. \n' + error, true); 	// Fehlermeldung zeigen
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

function ShowTermsPopup() {
	fetch(include.apiUrl + 'terms')
  	.then(result => result.json())
  	.then(result => {
		include.popup.text.clear();
		include.popup.text.addAll(result);
		include.ShowPopup("", "Nutzungsbestimmungen", "Close");		// Popup anzeigen
	}).catch(error => {
		// Ein Fehler ist bei der Verarbeitung aufgetreten
	    include.showLoadingIndicator.value = false; 																										// Loading Symbol ausblenden
	    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten. \n' + error, true); 	// Fehlermeldung zeigen			
	});
}

function ShowPrivacyPopup() {
	fetch(include.apiUrl + 'policy')
  	.then(result => result.json())
  	.then(result => {
		include.popup.text.clear();
		include.popup.text.addAll(result);
		include.ShowPopup("", "Datenschutzbestimmungen", "Close");		// Popup anzeigen
	}).catch(error => {
		// Ein Fehler ist bei der Verarbeitung aufgetreten
	    include.showLoadingIndicator.value = false; 																										// Loading Symbol ausblenden
	    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten. \n' + error, true); 	// Fehlermeldung zeigen			
	});
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
	popup: include.popup,

	allCredentialsEntered: allCredentialsEntered,
	passwordComplexity: passwordComplexity,
	repeatPasswordComplexity: repeatPasswordComplexity,
	
	OnPageActiv, OnPageActiv,
	Register: Register,
	ShowTermsPopup: ShowTermsPopup,
	ShowPrivacyPopup: ShowPrivacyPopup
};
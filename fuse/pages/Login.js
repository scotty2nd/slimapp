var include = require("/Main"),
	customer = require("modules/Customer");

var username = include.observable(""),
	password = include.observable("");

/*Eventuell in Observable Datei auslagern*/
var allCredentialsEntered = include.observable(function() {
	var credentials = username.value != "" && password.value != "";
	
	include.SetAndroidStatusbarColor(credentials, 1);

	return credentials;
});

function OnPageActiv() {
	include.SetAndroidStatusbarColor(allCredentialsEntered);
}

function Login() {
	include.showOverlay.value = true; 			// Overlay einblenden
	include.showLoadingIndicator.value = true; 	// Loading Symbol einblenden

	// Email Adresse ist eingegeben, gültig und Passwort ist eingegeben
	if(include.emailRegex.test(username.value) && password.value != ""){
		
		var requestObject = {
			email: username.value, 
			password: password.value
		};
		
	  	fetch(include.apiUrl + 'login', {
		  	method: 'POST',
		  	headers: { "Content-type": "application/json", "Accept": "application/json" },
		  	body: JSON.stringify(requestObject)
	  	}).then(function(response) {
			return response.json(); // This returns a promise
	  	}).then(function(data) {
		    // Server Antwort verarbeiten
		    if(data.id != "" && data.apikey != "" && data.error == false){ 
		    	// Kein Fehler und Customer ID sowie API Key sind gefüllt
	    		customer.AddIdentifier(data.error, data.message, data.id, data.apikey); // ID und API Key abspeichern

	    		include.showLoadingIndicator.value = false;	// Loading Symbol ausblenden
	    		include.showOverlay.value = false; 			// Overlay ausblenden

	    		// Weiterleiten auf Home Seite
	    		router.push("home");

	    		// Textfelder löschen
			    username.value = '';
			    password.value = '';
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
		// Email Adresse ist ungültig 
		include.showLoadingIndicator.value = false; 																							// Loading Symbol ausblenden
		include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Email-Adresse und/oder Passwort ungültig.', true); 	// Fehlermeldung zeigen
	}
}

function GoToRegisterPage() {
    router.push("register");
}

function GoToForgotPasswordPage() {
    router.push("forgotPassword");
}

module.exports = {
	username: username,
	password: password,

	showOverlay: include.showOverlay,
	showLoadingIndicator: include.showLoadingIndicator,
	modal: include.modal,
	Identifier: customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden

	allCredentialsEntered: allCredentialsEntered,
	
	OnPageActiv, OnPageActiv,
	Login: Login,
	GoToRegisterPage: GoToRegisterPage,
	GoToForgotPasswordPage: GoToForgotPasswordPage
};
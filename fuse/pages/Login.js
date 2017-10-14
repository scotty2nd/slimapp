var include = require("modules/Observable"),
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
	include.showOverlay.value = true; // Overlay einblenden
	include.showLoadingIndicator.value = true; // Loading Symbol einblenden

	// Email Adresse ist eingegeben, gültig und Passwort ist eingegeben
	if(include.emailRegex.test(username.value) && password.value != ""){
		var requestObject = {
			email: username.value, 
			password: password.value
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
	    		customer.AddIdentifier(data.error, data.message, data.id, data.apikey); // ID und API Key abspeichern

	    		include.showLoadingIndicator.value = false // Loading Symbol ausblenden
	    		include.showOverlay.value = false; // Overlay ausblenden

	    		router.push("home"); // Weiterleiten auf Home Seite

			    username.value = '';  // Reset Field
			    password.value = '';  // Reset Field
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
		// Email Adresse ist ungültig
		include.showLoadingIndicator.value = false; // Loading Symbol ausblenden

		include.modal.background = include.colors.error; // Modal Hintergrundfarbe setzen 
		include.modal.headline = "Oops!"; // Modal Dachzeile setzen
		include.modal.title = "Es ist ein Fehler aufgetreten."; // Modal Titel setzen
		include.modal.message.value = "Bitte E-Mail-Adresse und/oder Passwort eingeben."; // Modal Text setzen
		include.modal.visibility.value = true; // Modal sichtbar machen
	}
}

function GoToRegisterPage() {
    router.push("register");
}

function GoToForgotPasswordPage() {
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
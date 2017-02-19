var Customer = require("modules/Customer");
var Observable = require("modules/LoginObservable");

//busy.deactivate();

function click() {
	Observable.ShowOverlay.value = true; // Overlay einblenden

	busy.activate(); // Loading Symbol einblenden

    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex um auf gültige Email Adressen zu prüfen

	if(regex.test(Observable.Username.value)){
		// Email Adresse ist eingegeben und gültig
		var requestObject = {email: Observable.Username.value, password: Observable.Password.value};
		var status = 0;
		var response_ok = false;

	  	fetch('http://slimapp.dev/api/login', {
		  	method: 'POST',
		  	headers: { "Content-type": "application/json", "Accept": "application/json" },
		  	body: JSON.stringify(requestObject)
	  	}).then(function(response) {
	    	status = response.status; // Get the HTTP status code
			response_ok = response.ok; // Is response.status in the 200-range?

			return response.json(); // This returns a promise
	  	}).then(function(responseObject) {
		    // Do something with the result
		    if(responseObject.id != "" && responseObject.apikey != "" && responseObject.error == false){ // Prüfe ob ID und der API Kkey gefüllt ist sowie kein Fehler existiert 
	    		Customer.addIdentifier(responseObject.error, responseObject.message, responseObject.id, responseObject.apikey); // ID und API Key abspeichern

	    		busy.deactivate(); // Loading Symbol ausblenden

	    		Observable.ShowOverlay.value = false; // Overlay ausblenden

	    		router.push("home"); // Weiterleiten auf Home Seite

			    Observable.Username.value = '';  // Reset Field
			    Observable.Password.value = '';  // Reset Field
		    }else if(responseObject.error == true){
		    	busy.deactivate(); // Loading Symbol ausblenden

	    		Observable.ShowErrorModal.value = true; // Error Modal einblenden
				Observable.ModalMessage.value = responseObject.message; // Error Modal Text setzen
		    }
		}).catch(function(error) {
		    // An error occurred somewhere in the Promise chain

		    busy.deactivate(); // Loading Symbol ausblenden

			Observable.ShowErrorModal.value = true; // Error Modal einblenden
			Observable.ModalMessage.value = "Ein unbekannter Fehler ist aufgetreten."; // Error Modal Text setzen
		});
	}else{
		// Email Adresse ist ungültig

		busy.deactivate(); // Loading Symbol ausblenden

		Observable.ShowErrorModal.value = true; // Error Modal einblenden
		Observable.ModalMessage.value = "Ungültige E-Mail-Adresse"; // Error Modal Text setzen
	}
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}

/*Observable.OnError.onValueChanged(module, function(error) { // Prüft ob sich OnError Observable geändert hat
    if(!error){
    	//busy.deactivate(); 
    }
});*/

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
	Username: Observable.Username,
	Password: Observable.Password,
	ShowOverlay: Observable.ShowOverlay,
	ShowErrorModal: Observable.ShowErrorModal,
	ModalMessage: Observable.ModalMessage,
	Identifier: Customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden

	allLoginCredentialsEntered: Observable.allLoginCredentialsEntered,

	click: click,
	goToRegisterPage: goToRegisterPage
};
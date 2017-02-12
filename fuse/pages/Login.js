var Customer = require("modules/Customer");
var Observable = require("modules/LoginObservable");

function click() {
	// Regex um auf gültige Email Adressen zu prüfen
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
	  		// Get the HTTP status code
	  		// Is response.status in the 200-range?
	    	status = response.status;
			response_ok = response.ok;

			return response.json();    // This returns a promise
	  	}).then(function(responseObject) {
		    // Do something with the result
		    // Prüfe ob ID und der API Kkey gefüllt ist sowie kein Fehler existiert 
		    if(responseObject.id != "" && responseObject.apikey != "" && responseObject.error == false){
	    		Customer.addIdentifier(responseObject.error, responseObject.message, responseObject.id, responseObject.apikey);
	    		// Weiterleiten auf Home Seite
	    		router.push("home");

			    // Reset Fields
			    Observable.Username.value = '';
			    Observable.Password.value = '';
		    }else if(responseObject.error == true){
	    		// Error Modal zeigen
	    		Observable.onError.value = false;
				Observable.ModalMessage.value = responseObject.message;
		    }
		}).catch(function(error) {
		    // An error occurred somewhere in the Promise chain
		    // Error Modal zeigen
			Observable.onError.value = false;
			Observable.ModalMessage.value = "Ein unbekannter Fehler ist aufgetreten.";
		});
	}else{
		// Email Adresse ist ungültig Error Modal zeigen
		Observable.onError.value = false;
		Observable.ModalMessage.value = "Ungültige E-Mail-Adresse";
	}
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
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
	Identifier: Customer.Identifier,					//Wird noch für die Kontroll ausgabe benötigt kann aber später entfernt werden
	Username: Observable.Username,
	Password: Observable.Password,
	ModalMessage: Observable.ModalMessage,
	onError: Observable.onError,

	areCredentialsValid: Observable.areCredentialsValid,

	click: click,
	goToRegisterPage: goToRegisterPage
};
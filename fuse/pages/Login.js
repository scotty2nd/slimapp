var Customer = require("modules/Customer");
var Observable = require("modules/LoginObservable");

//busy.deactivate();

function click() {
		//Observable.onError.value = false;
		console.log('Anmelden geklickt busy aktiviert');
		busy.activate();
		//Observable.onError.value = false;
		/*setTimeout(function() {
			console.log('setTimeout');
			busy.deactivate();
		}, 4000);*/
		//debugger;

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

	    		busy.deactivate();

			    // Reset Fields
			    Observable.Username.value = '';
			    Observable.Password.value = '';
		    }else if(responseObject.error == true){
		    	
		    	busy.deactivate();

	    		// Error Modal zeigen
	    		Observable.onError.value = false;
				Observable.ModalMessage.value = responseObject.message;
		    }
		}).catch(function(error) {
		    // An error occurred somewhere in the Promise chain

		    busy.deactivate();

		    // Error Modal zeigen
			Observable.onError.value = false;
			Observable.ModalMessage.value = "Ein unbekannter Fehler ist aufgetreten.";
		});
	}else{
		console.log('email adresse ungültig');
		// Email Adresse ist ungültig 
		// Error Modal zeigen
		Observable.OnError.value = true;
		Observable.ModalMessage.value = "Ungültige E-Mail-Adresse";

		/*setTimeout(function() {
			Observable.ErrorOccured.value = false;
			busy.deactivate();
			console.log('timeoout');
		}, 40000);*/
		//console.log('feedback error modal?????');
		//console.log(Observable.ErrorModalOkayClicked.value);
		//debugger;
		/*if(ErrorModal.okClicked()){
			console.log('true Login.js');
			Observable.onError.value = true;
			debugger;
			busy.deactivate();
		}*/

		//debugger;
	}
	//Observable.ErrorOccured.value = false;
	//busy.deactivate();
}

function goToRegisterPage() {
	console.log('gotoRegsiter')
    router.push("register");
}

Observable.OnError.onValueChanged(module, function(error) {
    //do something
    if(!error){
	    console.log('do something');
    	console.log(error);
    	busy.deactivate();
    }
});

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
	ErrorModalOkayClicked: Observable.ErrorModalOkayClicked,
	OnError: Observable.OnError,

	allLoginCredentialsEntered: Observable.allLoginCredentialsEntered,

	click: click,
	goToRegisterPage: goToRegisterPage
};
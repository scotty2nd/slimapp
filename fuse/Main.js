// Variablen
var observable = require("FuseJS/Observable");

var colors = { 
	error: "#cc4339",
	success: "#008100",
	warning: "#000",
	info: "#000",
	primary: "#4080ff",
	primaryDisabled: "#ccc"
}

var modal = { 
	visibility: observable(false),
	color: observable(colors.primary),
	headline: observable(""),
	title: observable(""),
	message: observable("")
}

var popup = {
	visibility: observable(false),
	leftIcon: "",
	title: "",
	rightIcon: "",
	text: observable()
}

var showOverlay = observable(false),
	showLoadingIndicator = observable(false),
	androidStatusbarColor = observable(colors.primaryDisabled),
	apiUrl = 'http://app.scotty2nd.square7.ch/api/',
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 



// Funktionen
function GetPasswordComplexity(password) {
	var passwordStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
    	passwordMediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"),
		passwordComplexity = "";

	if(passwordStrongRegex.test(password)) {
	    passwordComplexity = "stark";
	}else if(passwordMediumRegex.test(password)) {
	    passwordComplexity = "mittel";
	}else if(password == "") {
		passwordComplexity = "";
	}else {
	    passwordComplexity = "schwach";
	}

	return passwordComplexity;
}

function SetAndroidStatusbarColor(allCredentialsEntered = false, allCredentialsEnteredReturnedWithoutValue = 0) {
	var value = "";

	if(allCredentialsEnteredReturnedWithoutValue == 1){
		value = allCredentialsEntered;
	}else{
		value = allCredentialsEntered.value;
	}

	if(value){
		androidStatusbarColor.value = colors.primary;
	}else{
		androidStatusbarColor.value = colors.primaryDisabled;
	}
}

function ShowModal(color, headline, title, message, visibility) {
	modal.color.value = color; 					// Modal Hintergrundfarbe setzen 
	modal.headline.value = headline; 				// Modal Dachzeile setzen
	modal.title.value = title; 					// Modal Titel setzen
	modal.message.value = message; 			// Modal Text setzen
	modal.visibility.value = visibility; 	// Modal sichtbar machen
}

function ShowPopup(leftIcon, title, rightIcon) {
	popup.leftIcon = leftIcon;				// Popup Navbar Icon Links setzen 
	popup.title = title;					// Popup Titel setzen
	popup.rightIcon = rightIcon;			// Popup Navbar Icon Rechts setzen 
	popup.visibility.value = true;			// Popup einblenden
}

function HidePopup() {
	popup.visibility.value = false;			// Popup ausblenden
}



module.exports = {
	observable: observable,
    modal: modal,
    popup: popup,
    colors: colors,
    showOverlay: showOverlay,
    showLoadingIndicator: showLoadingIndicator,
    androidStatusbarColor: androidStatusbarColor,
    apiUrl: apiUrl,
    emailRegex: emailRegex,

    GetPasswordComplexity: GetPasswordComplexity,
    SetAndroidStatusbarColor: SetAndroidStatusbarColor,
    ShowModal: ShowModal,
    ShowPopup: ShowPopup,
    HidePopup: HidePopup
};

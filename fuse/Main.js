var observable = require("FuseJS/Observable");

var modal = { 
	visibility: observable(false),
	color: "",
	headline: "",
	title: "",
	message: observable("")
}

var colors = { 
	error: "#cc4339",
	success: "#008100",
	warning: "#000",
	info: "#000",
	primary: "#4080ff",
	primaryDisabled: "#ccc"
}

var showOverlay = observable(false),
	showLoadingIndicator = observable(false),
	androidStatusbarColor = observable(colors.primaryDisabled);

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex um auf gültige Email Adressen zu prüfen

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
	modal.color = color; // Modal Hintergrundfarbe setzen 
	modal.headline = headline; // Modal Dachzeile setzen
	modal.title = title; // Modal Titel setzen
	modal.message.value = message; // Modal Text setzen
	modal.visibility.value = visibility; // Modal sichtbar machen
}

module.exports = {
	observable: observable,
    modal: modal,
    colors: colors,
    showOverlay: showOverlay,
    showLoadingIndicator: showLoadingIndicator,
    androidStatusbarColor: androidStatusbarColor,
    emailRegex: emailRegex,

    GetPasswordComplexity: GetPasswordComplexity,
    SetAndroidStatusbarColor: SetAndroidStatusbarColor,
    ShowModal: ShowModal
};
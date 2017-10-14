var observable = require("FuseJS/Observable");

var modal = { 
	visibility: observable(false),
	background: "",
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
	    console.log('starkes Passwort');
	    passwordComplexity = "strong";
	} else if(passwordMediumRegex.test(password)) {
	    console.log('mittleres Passwort');
	    passwordComplexity = "medium";
	} else {
	    console.log('schwaches Passwort');
	    passwordComplexity = "weak";
	}

	return passwordComplexity;
}

function SetAndroidStatusbarColor(param, type) {
	var value = "";

	if(type == 1){
		value = param;
	}else{
		value = param.value;
	}

	if(value){
		androidStatusbarColor.value = colors.primary;
	}else{
		androidStatusbarColor.value = colors.primaryDisabled;
	}
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
    SetAndroidStatusbarColor: SetAndroidStatusbarColor
};
var Observable = require("FuseJS/Observable");

var ShowOverlay = Observable(false),
	ShowLoadingIndicator = Observable(false);

var EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex um auf gültige Email Adressen zu prüfen

var Modal = { 
	Visibility: Observable(false),
	Background: "",
	Headline: "",
	Title: "",
	Message: Observable("")
}

var Colors = { 
	Error: "#cc4339",
	Success: "#008100",
	Warning: "#000",
	Info: "#000"
}

module.exports = {
    ShowOverlay: ShowOverlay,
    ShowLoadingIndicator: ShowLoadingIndicator,
    EmailRegex: EmailRegex,
    Modal: Modal,
    Colors: Colors
};
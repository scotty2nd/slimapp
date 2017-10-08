var Observable = require("FuseJS/Observable");

var ShowOverlay = Observable(false);
var ShowLoadingIndicator = Observable(false);

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
    Modal: Modal,
    Colors: Colors
};
var Observable = require("FuseJS/Observable");

var Username = Observable("");
var Password = Observable("");
var ModalMessage = Observable("");
var ShowOverlay = Observable(false);
var ShowErrorModal = Observable(false);

var allLoginCredentialsEntered = Observable(function() {
	var credentials = Username.value != "" && Password.value != "";
	//console.log('are credentials valid: ' + credentials);
	return credentials;
});

module.exports = {
    Username: Username,
    Password: Password,
    ShowOverlay: ShowOverlay,
    ShowErrorModal: ShowErrorModal,
    ModalMessage: ModalMessage,

    allLoginCredentialsEntered: allLoginCredentialsEntered
};
var Observable = require("FuseJS/Observable");

var Username = Observable("");
var Password = Observable("");
var ModalMessage = Observable("");
var onError = Observable(true);

var areCredentialsValid = Observable(function() {
	var credentials = Username.value != "" && Password.value != "";
	//console.log('are credentials valid: ' + credentials);
	return credentials;
});

module.exports = {
    Username: Username,
    Password: Password,
    ModalMessage: ModalMessage,
    onError: onError,

    areCredentialsValid: areCredentialsValid
};
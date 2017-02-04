var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");
var data = Observable();

var areCredentialsValid = Observable(function() {
	var credentials = username.value != "" && password.value != "";
	//console.log('are credentials valid: ' + credentials);
	return credentials;
});

module.exports = {
    username: username,
    password: password,
    data: data,

    areCredentialsValid: areCredentialsValid
};
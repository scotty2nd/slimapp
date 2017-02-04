var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");

var areCredentialsValid = Observable(function() {
	/*console.log('####areCredentialsValid####');
	console.log('username: ' + username.value);
	console.log('password: ' + password.value);*/
	var credentials = username.value != "" && password.value != "";
	console.log('are credentials valid: ' + credentials);
	return credentials;
});

module.exports = {
    username: username,
    password: password,

    areCredentialsValid: areCredentialsValid
};
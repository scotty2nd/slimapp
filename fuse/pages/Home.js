var Customer = require("modules/Customer");
/*var hike = this.Parameter;

var name = hike.map(function(x) { return x.name; });
var location = hike.map(function(x) { return x.location; });
var distance = hike.map(function(x) { return x.distance; });
var rating = hike.map(function(x) { return x.rating; });
var comments = hike.map(function(x) { return x.comments; });*/

function logout() {
    console.log('logout');
    Customer.clearIdentifier();
    router.goBack();
}

/* Wird im Moment nicht mehr benötigt weil es keine Buttons mehr dafür gibt
function save() {
	context.updateHike(hike.value.id, name.value, location.value, distance.value, rating.value, comments.value);
    router.goBack();
}

function cancel() {
	// Refresh hike value to reset dependent Observables' values
	hike.value = hike.value;
	router.goBack();
}*/

module.exports = {
    /*name: name,
    location: location,
    distance: distance,
    rating: rating,
    comments: comments,*/

    Identifier: Customer.Identifier,

    logout: logout,
    //save: save,
    //cancel: cancel
};
var context = require("modules/context");
var hike = this.Parameter;

var name = hike.map(function(x) { return x.name; });
var location = hike.map(function(x) { return x.location; });
var distance = hike.map(function(x) { return x.distance; });
var rating = hike.map(function(x) { return x.rating; });
var comments = hike.map(function(x) { return x.comments; });

function logout() {
    console.log('logout');
    router.goBack();
}

function save() {
	context.updateHike(hike.value.id, name.value, location.value, distance.value, rating.value, comments.value);
    router.goBack();
}

function cancel() {
	// Refresh hike value to reset dependent Observables' values
	hike.value = hike.value;
	router.goBack();
}

module.exports = {
    name: name,
    location: location,
    distance: distance,
    rating: rating,
    comments: comments,

    logout: logout,
    save: save,
    cancel: cancel
};

/*var Observable = require("FuseJS/Observable");

//var data = Observable("");
var dataOb = require("hikes");

function click() {
   
}

function logout() {
	console.log('logout');
	console.log(dataOb.data);
	//console.log(dataOb.data.value);
	//console.log(dataOb.message.value);
	//console.log(dataOb.data.message);
	//console.log(data.message);
	debugger;
	dataOb.clear();
    console.log('clear and go back');
    console.log(dataOb.message);
    //debugger;
    router.goBack();
}

module.exports = {
	dataOb: dataOb,
	click: click,
	logout: logout
};*/
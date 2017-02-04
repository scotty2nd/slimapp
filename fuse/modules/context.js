var Observable = require("FuseJS/Observable");
var Backend = require("./backend");

var hikes = Observable();
var username = Observable();
var password = Observable();

//Hikes initial aufrufen
getHikes();


function getHikes() {
    console.log('get hikes');
    Backend.getHikes().then(function(newHikes) {
        hikes.replaceAll(newHikes);
    }).catch(function(error) {
        console.log("Couldn't get hikes: " + error);
    });
}

function updateHike(id, name, location, distance, rating, comments) {
    console.log('update hike');
    console.log(id);
    console.log(name);
    console.log(hikes);
    //debugger;
    for (var i = 0; i < hikes.length; i++) {
        console.log(i);
        var hike = hikes.getAt(i);
        if (hike.id == id) {
            hike.name = name;
            hike.location = location;
            hike.distance = distance;
            hike.rating = rating;
            hike.comments = comments;
            hikes.replaceAt(i, hike);
            break;
        }
    }
    Backend.updateHike(id, name, location, distance, rating, comments)
        .catch(function(error) {
            console.log("Couldn't update hike: " + id);
        });
}

function addHike(id, name, location, distance, rating, comments) {
    console.log('add hike context');
    console.log(id);
    console.log(name);
    //console.log(hikes);
    //debugger;
    /*var test = [
        {
            id: 0,
            name: "Tricky Trails context",
            location: "Lakebed, Utah",
            distance: 10.4,
            rating: 4,
            comments: "This hike was nice and hike-like. Glad I didn't bring a bike."
        }
    ];*/

//hikes.push(test);

    //hikes.value = test;
    //hikes.value.id = 0;
    //hikes.value.name = "Tricky Trails context";
    //hikes.id = id;
    //hikes.push({id: id, name: name, location: location, distance: distance, rating: rating, comments: comments});

    /*var element = {}, cart = [];
    element.id = id;
    element.quantity = quantity;
    cart.push(element);*/

    /*hikes.push({
        id: id,
        name: name,
        location: location,
        distance: distance,
        rating: rating,
        comments: comments
    }); */

       //debugger;

    Backend.addHike(id, name, location, distance, rating, comments)
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    //debugger;
    getHikes();
    //debugger;
}

module.exports = {
    hikes: hikes,
    username: username,
    password: password,

    updateHike: updateHike,
    addHike: addHike
};
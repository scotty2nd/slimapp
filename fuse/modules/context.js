var Observable = require("FuseJS/Observable");
var Backend = require("./backend");

var hikes = Observable();

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

    Backend.addHike(id, name, location, distance, rating, comments)
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    getHikes();
}

function clearHikes() {
    console.log('clearHikes context');

    Backend.clearHikes()
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    getHikes();
}

module.exports = {
    hikes: hikes,

    updateHike: updateHike,
    addHike: addHike,
    clearHikes: clearHikes
};
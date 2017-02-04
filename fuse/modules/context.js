var Observable = require("FuseJS/Observable");
var Backend = require("./backend");

var hikes = Observable();

//Hikes initial aufrufen
getHikes();

/* *
 * Parameters: none
 * */
function getHikes() {
    console.log('get hikes');
    Backend.getHikes().then(function(newHikes) {
        hikes.replaceAll(newHikes);
    }).catch(function(error) {
        console.log("Couldn't get hikes: " + error);
    });
}

/* TODO wird später noch mit eingebaut
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
}*/

/* *
 * Parameters: error, message, id, apikey
 * */
function addHike(error, message, id, apikey) {
    console.log('addHike context');
    console.log("error: " + error);
    console.log("message: " + message);
    console.log("id: " + id);
    console.log("apikey: " + apikey);

    Backend.addHike(error, message, id, apikey)
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    getHikes();
}

/* *
 * Parameters: none
 * */
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

    //updateHike: updateHike,
    addHike: addHike,
    clearHikes: clearHikes
};
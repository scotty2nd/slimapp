var Observable = require("FuseJS/Observable");
var CustomerBackend = require("./CustomerBackend");

var Identifier = Observable();

//Hikes initial aufrufen
getIdentifier();

/* *
 * Parameters: none
 * */
function getIdentifier() {
    CustomerBackend.getIdentifier().then(function(newIdentifier) {
        Identifier.replaceAll(newIdentifier);
    }).catch(function(error) {
        console.log("Couldn't get identifier: " + error);
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
function addIdentifier(error, message, id, apikey) {
    CustomerBackend.addIdentifier(error, message, id, apikey)
        .catch(function(error) {
            console.log("Couldn't add Identifier: " + id);
        });
    
    getIdentifier();
}

/* *
 * Parameters: none
 * */
function clearIdentifier() {
    CustomerBackend.clearIdentifier()
        .catch(function(error) {
            console.log("Couldn't clear Identifier: " + id);
        });
    
    getIdentifier();
}

module.exports = {
    Identifier: Identifier,

    //updateHike: updateHike,
    addIdentifier: addIdentifier,
    clearIdentifier: clearIdentifier
};
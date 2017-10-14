var observable = require("FuseJS/Observable");
var customerBackend = require("./CustomerBackend");

var identifier = observable();

//Hikes initial aufrufen
GetIdentifier();

/* *
 * Parameters: none
 * */
function GetIdentifier() {
    customerBackend.GetIdentifier().then(function(newIdentifier) {
        identifier.replaceAll(newIdentifier);
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
function AddIdentifier(error, message, id, apikey) {
    customerBackend.AddIdentifier(error, message, id, apikey)
        .catch(function(error) {
            console.log("Couldn't add Identifier: " + id);
        });
    
    GetIdentifier();
}

/* *
 * Parameters: none
 * */
function ClearIdentifier() {
    customerBackend.ClearIdentifier()
        .catch(function(error) {
            console.log("Couldn't clear Identifier: " + id);
        });
    
    GetIdentifier();
}

module.exports = {
    identifier: identifier,

    //updateHike: updateHike,
    AddIdentifier: AddIdentifier,
    ClearIdentifier: ClearIdentifier
};
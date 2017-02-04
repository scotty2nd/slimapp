var Observable = require("FuseJS/Observable");
var Backend = require("./backend");

var customerIdentifier = Observable();

//Hikes initial aufrufen
getCustomerIdentifier();

/* *
 * Parameters: none
 * */
function getCustomerIdentifier() {
    console.log('getCustomerIdentifier context');
    Backend.getCustomerIdentifier().then(function(newIdentifier) {
        customerIdentifier.replaceAll(newIdentifier);
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
function addCustomerIdentifier(error, message, id, apikey) {
    console.log('addCustomerIdentifier context');
    console.log("error: " + error);
    console.log("message: " + message);
    console.log("id: " + id);
    console.log("apikey: " + apikey);

    Backend.addCustomerIdentifier(error, message, id, apikey)
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    getCustomerIdentifier();
}

/* *
 * Parameters: none
 * */
function clearCustomerIdentifier() {
    console.log('clearCustomerIdentifier context');

    Backend.clearCustomerIdentifier()
        .catch(function(error) {
            console.log("Couldn't add hike: " + id);
        });
    
    getCustomerIdentifier();
}

module.exports = {
    customerIdentifier: customerIdentifier,

    //updateHike: updateHike,
    addCustomerIdentifier: addCustomerIdentifier,
    clearCustomerIdentifier: clearCustomerIdentifier
};
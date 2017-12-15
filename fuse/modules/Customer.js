var include = require("/Main"),
    customer = include.observable(),
    customerTemporay = [];

/* *
 * Description
 * Parameters: none
 * Return: a Promise
 * */
function GetIdentifier() {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(customerTemporay);
        }, 0);
    });

    promise.then(function(result) {
        customer.replaceAll(result);
    }).catch(function(error) {
        console.log("Couldn't get identifier: " + error);
    });
}

/* *
 * Description
 * Parameters: error, message, id, apikey
 * Return: a Promise
 * */
function AddIdentifier(error, message, id, apikey) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            customerTemporay.push({
                error:   error,
                message: message,
                id:      id,
                apikey:  apikey
            }); 
            resolve();
            /*Testausgabe*/
            console.dir(customerTemporay[0]);
        }, 0);
    });

    promise.catch(function(error) {
        console.log("Couldn't add Identifier: " + id);
    });
    
    GetIdentifier();
}

/* *
 * Description
 * Parameters: none
 * Return: a Promise
 * */
function ClearIdentifier() {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            customerTemporay = [];
            resolve();
        }, 0);
    });

    promise.catch(function(error) {
        console.log("Couldn't clear Identifier: " + id);
    });
    
    GetIdentifier();
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

module.exports = {
    customer: customer,

    GetIdentifier: GetIdentifier,
    AddIdentifier: AddIdentifier,
    ClearIdentifier: ClearIdentifier,
    //updateHike: updateHike,
};
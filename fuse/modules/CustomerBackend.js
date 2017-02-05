var identifier = [
    {
        error: false,
        message: "Kontroll Eintrag",
        id: 1,
        apikey: "1238cf96c359e74065035206af06b123"
    }
];

/* *
 * Description
 * Parameters: none
 * Return: a Promise
 * */
function getIdentifier() {
    console.log('getIdentifier backend');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(identifier);
        }, 0);
    });
}

/* TODO wird später noch mit eingebaut
function updateHike(id, name, location, distance, rating, comments) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            for (var i = 0; i < customerIdentifier.length; i++) {
                var hike = customerIdentifier[i];
                if (hike.id == id) {
                    hike.name = name;
                    hike.location = location;
                    hike.distance = distance;
                    hike.rating = rating;
                    hike.comments = comments;
                    break;
                }
            }

            resolve();
        }, 0);
    });
}*/

/* *
 * Parameters: error, message, id, apikey
 * */
function addIdentifier(error, message, id, apikey) {
    console.log('addIdentifier backend');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            
            console.log("error: " + error);
            console.log("message: " + message);
            console.log("id: " + id);
            console.log("apikey: " + apikey);

            identifier.push({
                error: error,
                message: message,
                id: id,
                apikey: apikey
            }); 
            debugger;
            resolve();
        }, 0);
    });
}

/* *
 * Parameters: none
 * */
function clearIdentifier() {
    console.log('clearIdentifier backend');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            identifier = [
            {
                error: false,
                message: "Kontroll Eintrag Gelöscht",
                id: 2,
                apikey: "1238cf96c359e74065035206af06b123"
            }];
            debugger;
            resolve();
        }, 0);
    });

}

module.exports = {
    getIdentifier: getIdentifier,
    //updateHike: updateHike,
    addIdentifier: addIdentifier,
    clearIdentifier: clearIdentifier
};
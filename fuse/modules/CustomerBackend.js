var identifier = [
    {
        error: false,
        message: "Kontroll Eintrag",
        id: "1 Kontrolle Initial",
        apikey: "1238cf96c359e74065035206af06b123"
    }
];

/* *
 * Description
 * Parameters: none
 * Return: a Promise
 * */
function GetIdentifier() {
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
function AddIdentifier(error, message, id, apikey) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            identifier.push({
                error: error,
                message: message,
                id: id,
                apikey: apikey
            }); 
            resolve();
        }, 0);
    });
}

/* *
 * Parameters: none
 * */
function ClearIdentifier() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            identifier = [
            {
                error: false,
                message: "Kontroll Eintrag Gelöscht",
                id: "2 Kontrolle Logout",
                apikey: "1238cf96c359e74065035206af06b123"
            }];
            resolve();
        }, 0);
    });

}

module.exports = {
    GetIdentifier: GetIdentifier,
    AddIdentifier: AddIdentifier,
    ClearIdentifier: ClearIdentifier,
    //updateHike: updateHike,
};
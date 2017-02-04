var hikesSourceArray = [
    {
        id: 0,
        name: "Tricky Trails",
        location: "Lakebed, Utah",
        distance: 10.4,
        rating: 4,
        comments: "This hike was nice and hike-like. Glad I didn't bring a bike."
    }
];

function getHikes() {
    console.log('getHikes backend');
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(hikesSourceArray);
        }, 0);
    });
}

function updateHike(id, name, location, distance, rating, comments) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            for (var i = 0; i < hikesSourceArray.length; i++) {
                var hike = hikesSourceArray[i];
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
}

function addHike(id, name, location, distance, rating, comments) {
    console.log('addHike backend');
    //debugger;
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            
            console.log(id);
            console.log(name);
            console.log(location);
            console.log(distance);
            console.log(rating);
            console.log(comments);

            hikesSourceArray.push({
                id: id,
                name: name,
                location: location,
                distance: distance,
                rating: rating,
                comments: comments
            }); 
            debugger;
            resolve();
        }, 0);
    });
}

module.exports = {
    getHikes: getHikes,
    updateHike: updateHike,
    addHike: addHike
};
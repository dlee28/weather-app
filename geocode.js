const request = require('postman-request');

const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const key = ".json?access_token=pk.eyJ1IjoiZGxlZTI4IiwiYSI6ImNrcThrZmN3ajAxMGcybmt5cG5hdG51NnAifQ.xbE_b8CKSxNwoa69-vtSJw";

const geocode = (address, callback) => {
    const url = geourl + encodeURIComponent(address) + key;
    request({url: url, json: true}, function(error, response, body) {
        if (error) {
            callback('unable to connect to mapbox api', undefined);
        }
        else if (body.features.length == 0) {
            callback('there were no results for the address provied.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
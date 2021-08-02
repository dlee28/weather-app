const { url } = require('inspector');
const request = require('postman-request');

const weatherurl = 'http://api.weatherstack.com/current?access_key=1de63f8f1dbea05fce539ac23f7cc470&query=';

const getWeather = (latitude, longitude, callback) => {
    const url = weatherurl + latitude + "," + longitude + "&units=f";
    request({url: url, json: true} , function (error, response, body) {
        if (error) {
            callback('could not access weather api', undefined);
        }
        else if (body.error) {
            callback(body.error, undefined);
        }
        else {
            callback(error, {
                temperature: body.current.temperature,
                precip: body.current.precip
            });
        }
    });
};

const printDegrees = (body) => {
    console.log('it is currently ' + body.current.temperature + ' degrees out.')
};

const printRain = (body) => {
    console.log('chance of rain is ' + body.current.precip);
};

module.exports = getWeather;
const request = require('postman-request');
const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');

console.log('start');


yargs.command({
    command:'weather', 
    describe:'check the weather of a city',
    builder: {
        city: {
            default: 'New York',
            describe: 'City Name', 
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv) {
        console.log('Command: ', 'weather');
        console.log('city: ', argv.city);
        geocode(argv.city, (error, {latitude, longitude} = {}) => {
            if (error) {
                console.log(error);
            }
            else {
                weather(latitude, longitude, (error, {temperature, precip} = {}) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log('temp: ' + temperature + '\n' + 'precip: ' + precip)
                    }
                });   
            }
        });
    }
});


yargs.parse();
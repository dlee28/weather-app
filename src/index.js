const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000

// Paths for express config
const publicDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, '../handlebars/views');
const partialsDir = path.join(__dirname, '../handlebars/partials');

// handlebars engine views
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Setup static dir
app.use(express.static(publicDir));
    

/*
There are many differnt pages to a website.
fb.com
fb.com/login
fb.com/about 
All of them are on a single server (fb.com)
but the / makes it so there are multiple routes within the single server

*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'index',
        name: 'DK'
    });
});

app.get('/about', (req, res) => {  
    res.render('about', {
        title: 'about'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'this is a message for message'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address was not provided'
        });
    } else {
        console.log(req.query.address);
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send(error);
            } else {
                console.log(latitude, longitude, location);
                weather(latitude, longitude, (error, {temperature, precip} = {}) => {
                    if (error) {
                        return res.send({
                            error
                        });
                    } else {
                        res.send({
                            address: req.query.address,
                            forecast: temperature,
                            precip: precip,
                            location: location
                            
                        });
                    };
                });
            };
        });
    };
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
            res.send({
            error: 'must provide a search term'
        });
    } else {
        console.log(req.query.search);
        res.send({
            products: []
        });
    };
})

app.get('/help/*', (req, res) => {
    res.redirect('/help');
});

app.get('*', (req, res) => {
    res.send('My 404 Page');
});

app.listen(port, () => {
    console.log('server running on port ' + port);
});
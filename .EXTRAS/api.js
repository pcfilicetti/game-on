var NodeGeocoder = require('node-geocoder');
var fetch = require('node-fetch');
var distance = require('google-distance-matrix');


var keys = require("./keys.js");
var city;
var state;

/* DarkSky API request from https://gist.github.com/prof3ssorSt3v3/0cdc5b0f118e06b8c1c0e255c3db704a (youtube tutorial)*/
function darkSky(lat, lng) {

    //let uri = 'http://jsonplaceholder.typicode.com/users';
    var darksky = 'https://api.darksky.net/forecast/';
    var dKey = keys.darkSkyKey.secret;
    var uri = darksky + dKey + '/' + lat + ',' + lng;
    // console.log(uri);
    uri = uri.concat('?units=us&exclude=minutely,hourly');
    // units - ca, si, us, uk
    // exclude - minutely,hourly,daily,currently
    // lang - 
    var darkOptions = {
        method: 'GET',
        mode: 'cors'
    }
    var req = new fetch.Request(uri, darkOptions);

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Bad HTTP!')
            }
        })
        .then((darkData) => {
            // console.log("Currently:");
            // var currentWeather= darkData.currently
            // console.log(`Currently:${currentWeather.temperature}, ${currentWeather.summary}, 
            // Wind Speed: ${currentWeather.windSpeed}, Chance of Rain: ${currentWeather.precipProbability}, Humidity: ${currentWeather.humidity}`);

            console.log("Weekly Summary:");
            // console.log(darkData.daily);
            console.log(darkData.daily.summary)
            // Need to do unix time conversion for 
            var weeklyWeather = darkData.daily.data
            for (var i = 0; i < weeklyWeather.length; i++) {
                console.log(weeklyWeather[i].summary);
            }
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}

// Geocode Function======================
function geoCode(){

var geoOptions = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: keys.geocodeKey.secret,
    formatter: null
};

var geocoder = NodeGeocoder(geoOptions);
var location = "new york, ny" //User Input
// Using callback
geocoder.geocode(location, function (err, geoResult) {

    // console.log(geoResult )
    // console.log(geoResult[0]); //One Array with only one index at index[0]

    var latResult = geoResult[0].latitude;
    console.log(latResult);

    var lngResult = geoResult[0].longitude;
    console.log(lngResult);

    city = geoResult[0].city;
    state = geoResult[0].administrativeLevels.level1long;

    console.log(geoResult[0].city, geoResult[0].administrativeLevels.level1long);


    // Calling matrix API
    googleMatrix(city, state);

    // Calling DarkSky API with the lattitude and longtitude.
    darkSky(latResult, lngResult);



});
}



// Google Matrix (Phase 2)===========================================================================
// console.log("Lat from geocode:" +latResult);
function googleMatrix() {
    var origins = [city, state];
    // var origins = ["Arlington, VA"];
    var destinations = ['New York NY', "Sanfrancisco, CA"]; // zip or address from Created Group

    distance.key(keys.geocodeKey.secret);
    distance.units('imperial');

    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if (!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            console.log(distances);

            for (var i = 0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    });
}

// on click:
// $("#zipCode").on("click", geoCode);
geoCode()


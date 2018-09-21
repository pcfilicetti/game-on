var NodeGeocoder = require('node-geocoder');
var fetch = require('node-fetch');

var keys= require ("./keys.js");


var geoOptions = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: keys.geocodeKey.secret,
  formatter: null         
};
 
var geocoder = NodeGeocoder(geoOptions);
var location= "new york, ny" 
// Using callback
geocoder.geocode(location, function(err, geoRes) {
  
  
  // console.log(geoRes[0]); //One Array with only one index at index[0]
  
  var latResult= geoRes[0].latitude;
  console.log(latResult);

  var lngResult= geoRes[0].longitude;
  console.log(lngResult);
  darkSky(latResult, lngResult);


});



/* DarkSky API request from https://gist.github.com/prof3ssorSt3v3/0cdc5b0f118e06b8c1c0e255c3db704a (youtube tutorial)*/
function darkSky (lat, lng){

//let uri = 'http://jsonplaceholder.typicode.com/users';
var darksky = 'https://api.darksky.net/forecast/';
var dKey = keys.darkSkyKey.secret;
var uri = darksky + dKey + '/' + lat +','+ lng;
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
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad HTTP!')
        }
    })
    .then( (darkData) =>{
        // console.log("Currently:");
        // var currentWeather= darkData.currently
        // console.log(`Currently:${currentWeather.temperature}, ${currentWeather.summary}, 
        // Wind Speed: ${currentWeather.windSpeed}, Chance of Rain: ${currentWeather.precipProbability}, Humidity: ${currentWeather.humidity}`);

        console.log("Weekly Summary:");
        // console.log(darkData.daily);
        console.log(darkData.daily.summary)
        // Need to do unix time conversion for 
        var weeklyWeather= darkData.daily.data
        for (var i = 0 ; i< weeklyWeather.length; i++){
          console.log(weeklyWeather[i].summary);

        }
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });
  }
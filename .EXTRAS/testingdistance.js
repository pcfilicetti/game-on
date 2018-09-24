var request = require ("request");
request("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
   
    console.log(JSON.parse(body).rows[0].elements[0].distance.text);

    //   console.log("The movie's rating is: " + JSON.parse(body));
    }
   });
// Load Data

var request = require("request");
var goGames = require("../data/goGames.js");
var goSports = require("../data/goSports.js");
var distance = require('google-distance-matrix');
var keys = require("./keys.js");

var firstZip;
var secondZip;
var distanceObject;

module.exports = function (app) {


    app.get("/api/distance", function (req, res) {
        return res.json(goGames);
    });

    // setting variable here globally so that we can use it from the scope below
    var distancePost;

    app.post("/api/distance", function (req, res) {
        distanceObject = req.body;
        firstZip = distanceObject.firstZip;
        secondZip = distanceObject.secondZip;

        request("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log(JSON.parse(body).rows[0].elements[0].distance.text);
                distancePost = JSON.parse(body).rows[0].elements[0].distance.text;

                //   console.log("The movie's rating is: " + JSON.parse(body));
            }
        });
        // res.send(distancePost);
        res.text(distancePost);
    });



















    // res.json(secondZip);

    //     googleMatrix()
    //     function googleMatrix() {
    //         var origins = ["zip " + firstZip];
    //         // var origins = ["Arlington, VA"];
    //         var destinations = ["zip " + secondZip]; // zip or address from Created Group

    //         distance.key(keys.geocodeKey.secret);
    //         distance.units('imperial');

    //         distance.matrix(origins, destinations, function (err, distances) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             if (!distances) {
    //                 return console.log('no distances');
    //             }
    //             if (distances.status == 'OK') {
    //                 console.log(distances);

    //                 for (var i = 0; i < origins.length; i++) {
    //                     for (var j = 0; j < destinations.length; j++) {
    //                         var origin = distances.origin_addresses[i];
    //                         var destination = distances.destination_addresses[j];
    //                         if (distances.rows[0].elements[j].status == 'OK') {
    //                             var distance = distances.rows[i].elements[j].distance.text;
    //                             console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);

    //                         } else {
    //                             console.log(destination + ' is not reachable by land from ' + origin);
    //                         }

    //                     }
    //                 }
    //             }
    //         });
    //     }

    //     res.send(distance);
    // });


    // app.post("/api/distance", function (req, res) {
    //     var test = 22202999999999;
    //     res.send(test);

    //     distanceObject = req.body;
    //     firstZip = distanceObject.firstZip;
    //     secondZip = distanceObject.secondZip;

    //     googleMatrix()
    //     function googleMatrix() {
    //         var origins = ["zip "+ firstZip];
    //         // var origins = ["Arlington, VA"];
    //         var destinations = ["zip " + secondZip]; // zip or address from Created Group

    //         distance.key(keys.geocodeKey.secret);
    //         distance.units('imperial');

    //         distance.matrix(origins, destinations, function (err, distances) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             if (!distances) {
    //                 return console.log('no distances');
    //             }
    //             if (distances.status == 'OK') {
    //                 console.log(distances);

    //                 for (var i = 0; i < origins.length; i++) {
    //                     for (var j = 0; j < destinations.length; j++) {
    //                         var origin = distances.origin_addresses[i];
    //                         var destination = distances.destination_addresses[j];
    //                         if (distances.rows[0].elements[j].status == 'OK') {                           
    //                             var distance = distances.rows[i].elements[j].distance.text;
    //                             console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);

    //                         } else {
    //                             console.log(destination + ' is not reachable by land from ' + origin);
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    //     }
    //     return distance;

    // }); //end of post




    app.get("/data/goGames", function (req, res) {
        return res.json(goGames);
    });

    app.get("/data/goSports", function (req, res) {
        return res.json(goSports);
    });


    app.post("/data/goGames", function (req, res) {
        goGames.push(req.body);
    });

    app.post("/data/goSports", function (req, res) {
        goSports.push(req.body);
    });


};
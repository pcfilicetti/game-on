// Load Data

var goGames = require("../data/goGames.js");
var goSports = require("../data/goSports.js");



// JSON Routes

module.exports = function (app) {


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
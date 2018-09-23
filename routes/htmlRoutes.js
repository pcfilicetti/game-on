// Dependencies
var express = require("express");
var path = require("path");


// HTML Routes

module.exports = function (app) {

    // app.use("/assets", express.static('../public/assets'));

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};

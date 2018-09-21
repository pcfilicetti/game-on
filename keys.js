require("dotenv").config(); 

var geocodeKey= {
  key: process.env.GOOGLE_ID
}


module.exports = {
  geocodeKey:geocodeKey
}
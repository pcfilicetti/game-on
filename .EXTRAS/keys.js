require("dotenv").config(); 

var geocodeKey= {
  secret: process.env.GOOGLE_ID
}

var darkSkyKey= {
  secret: process.env.DARKSKY_ID
}


module.exports = {
  geocodeKey:geocodeKey,
  darkSkyKey:darkSkyKey
}
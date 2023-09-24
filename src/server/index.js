var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const { getLocation, getWeather, getImages } = require("./API.js");
var cors = require("cors");

// var json = {
//   title: "test json response",
//   message: "this is a message",
//   time: "now",
// };

const app = express();
// app.use(cors({ origin: "*" }));
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.get("/api/location", async (req, res) => {
  const location = req.query?.location;
  const locationDetails = await getLocation(location);
  res.json(locationDetails);
});

app.get("/api/weather", async (req, res) => {
  const lat = req.query?.lat;
  const lng = req.query?.lng;
  const country = req.query?.country;
  const date = req.query?.date;
  const weatherDetails = await getWeather(lat, lng, country, date);
  res.json(weatherDetails);
});

app.get("/api/images", async (req, res) => {
  const location = req.query?.location;
  const images = await getImages(location);
  res.json(images);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log("Example app listening on port 8081!");
});

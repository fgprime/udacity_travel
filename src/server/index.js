const express = require("express");
var bodyParser = require("body-parser");
const { getWeather, getImages } = require("./API.js");
const crypto = require("crypto");
var cors = require("cors");

const app = express();
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

let userData = [
  {
    id: "5505938d-79bb-43b3-9914-d573dc470d90",
    location: "Hamburg",
    date: "2024-09-12T00:00:00.000Z",
    lat: 53.5521285714286,
    lng: 10.0004285714286,
    country: "DE",
    max_temp: 23.6,
    min_temp: 11.7,
    description: "Scattered clouds",
    image:
      "https://pixabay.com/get/g369c82aca01abd165f491c98a1f4b05387e7c7c743f0cbd4006444127bed0cacdf92ceffeec63ee41ee209be99457bfe9717209ebf6c99171066faef488c7eb2_1280.jpg",
  },
];

// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/api", async (req, res) => {
  res.json(userData);
});

app.post("/api", async (req, res) => {
  const requestData = req.body;
  const entry = {
    id: crypto.randomUUID(),
    ...requestData,
  };
  userData.push(entry);
  res.json(userData);
});

app.delete("/api", async (req, res) => {
  const id = req.body?.id;

  userData = userData.filter((element) => {
    return element.id !== id;
  });

  res.json(userData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

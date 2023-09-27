const express = require("express");
var bodyParser = require("body-parser");
const { getData, updateData, removeData } = require("./API.js");
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
  res.json(getData());
});

app.post("/api", async (req, res) => {
  const requestData = req.body;

  res.json(updateData(requestData));
});

app.delete("/api", async (req, res) => {
  const id = req.body?.id;

  res.json(removeData(id));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

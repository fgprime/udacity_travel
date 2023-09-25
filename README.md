# Udacity Trave App Project

The goal of this project is to show the knowledge gained in the Udacity course around webpack, html, scss, javascript and express.

It is an app to plan a holiday. It uses the external APIs Geonames, Weatherbit and Pixabay.

## Get Up and Running

A valid API key for Geonames, Weatherbit and Pixabay has to be set up in a .env file.

e.g.
GEONAMES_USERNAME=ABCDEFG
WEATHERBIT_APIKEY=ABCDEFG
PIXABAY_APIKEY=ABCDEFG

`cd` into your new folder and run:

- `npm install`
- `npm run build-dev` to start the webpack dev server
- `npm run build-prod` to generate a dist folder for prod
- `npm start` to run the Express server on port 8081

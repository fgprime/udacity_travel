/* Global Variables */
const dotenv = require("dotenv");
dotenv.config();

const geonamesUsername = process.env.GEONAMES_USERNAME;
const geonamesService = "http://api.geonames.org/postalCodeLookupJSON";
console.log(`Your Geonames API username is ${geonamesUsername}`);

const weatherbitApiKey = process.env.WEATHERBIT_APIKEY;
const weatherbitService = "https://api.weatherbit.io/v2.0/forecast/daily?";
console.log(`Your Weatherbit API key is ${weatherbitApiKey}`);

const pixabayApiKey = process.env.PIXABAY_APIKEY;
const pixabayService = "https://pixabay.com/api/?";
console.log(`Your Pixabay API key is ${pixabayApiKey}`);

async function getLocation(location) {
  let queries = [];

  console.dir(location);

  queries.push(`placename=${location}`);
  // Remove country to be selectable in frontend
  // queries.push(`country=DE`);
  queries.push(`username=${geonamesUsername}`);

  // queries.push(`txt=${encodeURIComponent(text)}`);

  const query = queries.join("&");
  const url = `${geonamesService}?${query}`;

  console.dir(url);
  const response = await fetch(url, {});
  try {
    const data = await response.json();

    // console.dir(data);

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

async function getWeather(lat, lng, country, date) {
  console.dir(date);
  const MILLISECONDS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const endDate =
    new Date(date).getTime() +
    1 *
    HOURS_IN_DAY *
    MINUTES_IN_HOUR *
    SECONDS_IN_MINUTE *
    MILLISECONDS_IN_SECOND;

  const formatedEndDate = new Date(endDate).toISOString().slice(0, 10);

  console.dir(date);
  console.dir(endDate);
  console.dir(formatedEndDate);

  let queryParameter = {
    lat: lat,
    lon: lng,
    country: country,
    language: "en",
    start_date: date,
    end_date: formatedEndDate,
    units: "M",
    days: 1,
    key: weatherbitApiKey,
  };

  const url = `${weatherbitService}${new URLSearchParams(
    queryParameter,
  ).toString()}`;

  console.dir(url);

  const response = await fetch(url, {});
  try {
    const data = await response.json();

    console.dir(data);

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

async function getImages(location) {
  let queryParameter = {
    key: pixabayApiKey,
    q: location,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    order: "popular",
  };

  const url = `${pixabayService}${new URLSearchParams(
    queryParameter,
  ).toString()}`;

  console.dir(url);

  const response = await fetch(url, {});
  try {
    const data = await response.json();

    console.dir(data);

    if (data?.hits?.length > 0) {
      return data.hits[0];
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = { getLocation, getWeather, getImages };

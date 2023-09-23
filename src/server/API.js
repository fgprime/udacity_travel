/* Global Variables */
const dotenv = require("dotenv");
dotenv.config();

const geonamesUsername = process.env.GEONAMES_USERNAME;
const geonamesService = "http://api.geonames.org/postalCodeLookupJSON";

console.log(`Your Geonames API username is ${geonamesUsername}`);

async function getLocation(postalCode) {
  let queries = [];

  queries.push(`postalcode=${"84416"}`);
  queries.push(`country=DE`);
  queries.push(`username=${geonamesUsername}`);

  // queries.push(`txt=${encodeURIComponent(text)}`);

  const query = queries.join("&");
  const url = `${geonamesService}?${query}`;

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
module.exports = { getLocation };

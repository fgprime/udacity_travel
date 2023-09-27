import { GEONAMES_USERNAME } from "./environment";
const GEONAMES_SERVICE = "http://api.geonames.org/postalCodeLookupJSON?";

async function fetchLocation(location) {
  const params = {
    placename: location,
    username: GEONAMES_USERNAME,
  };

  const url = `${GEONAMES_SERVICE}${new URLSearchParams(params).toString()}`;

  const response = await fetch(url);
  const locationDetails = await response.json();

  const locationDetail = locationDetails?.postalcodes[0];

  return {
    postalCode: locationDetail.postalcode,
    country: locationDetail.countryCode,
    lat: locationDetail.lat,
    lng: locationDetail.lng,
  };
}

export { fetchLocation };

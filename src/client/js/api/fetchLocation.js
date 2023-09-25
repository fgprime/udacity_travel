async function fetchLocation(location) {
  const params = {
    location: location,
  };

  const url =
    "http://localhost:8081/api/location?" +
    new URLSearchParams(params).toString();

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

let trips = [];

async function createTrip(trip) {
  let enrichedTrip = {};
  try {
    enrichedTrip = await fetchContextData(trip);
  } catch (error) {
    console.dir(error);
    alert("Location can not be resolved");
    return;
  }

  trips.push(enrichedTrip);

  Client.updateView(trips);
}

function removeTrip(event) {
  const element = event.target;

  console.dir(element);
  const id = Number(element.dataset.id);

  console.dir(id);
  console.log(element.dataset.id);

  trips.splice(id, 1);

  Client.updateView(trips);
  console.log("Remove Element");
}

async function fetchContextData(trip) {
  const locationDetail = await fetchLocationDetails(trip.location);

  const formatedDate = new Date(trip.date).toISOString().slice(0, 10);
  const weatherDetail = await fetchWeatherDetails(
    locationDetail.lat,
    locationDetail.lng,
    locationDetail.country,
    formatedDate,
  );

  const image = await fetchImages(trip.location);

  const enrichedTrip = {
    ...trip,
    lat: locationDetail.lat,
    lng: locationDetail.lng,
    country: locationDetail.country,
    max_temp: weatherDetail.max_temp,
    min_temp: weatherDetail.min_temp,
    description: weatherDetail.description,
    image: image?.largeImageURL,
  };

  return enrichedTrip;
}

async function fetchLocationDetails(location) {
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

async function fetchWeatherDetails(lat, lng, country, date) {
  const params = {
    lat,
    lng,
    country,
    date,
  };

  const url =
    "http://localhost:8081/api/weather?" +
    new URLSearchParams(params).toString();

  const response = await fetch(url);
  const weatherDetail = await response.json();

  return {
    max_temp: weatherDetail?.data[0]?.max_temp,
    min_temp: weatherDetail?.data[0]?.min_temp,
    description: weatherDetail?.data[0]?.weather?.description,
  };
}

async function fetchImages(location) {
  const params = {
    location,
  };

  const url =
    "http://localhost:8081/api/images?" +
    new URLSearchParams(params).toString();

  const response = await fetch(url);
  const images = await response.json();

  console.dir(images);

  return images;
}

export { createTrip, removeTrip };

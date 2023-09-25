import { fetchLocation, fetchWeather, fetchImage } from "./api";

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
  const id = Number(element.dataset.id);

  trips.splice(id, 1);

  Client.updateView(trips);
}

async function fetchContextData(trip) {
  const locationDetail = await fetchLocation(trip.location);

  const formatedDate = new Date(trip.date).toISOString().slice(0, 10);
  const weatherDetail = await fetchWeather(
    locationDetail.lat,
    locationDetail.lng,
    locationDetail.country,
    formatedDate,
  );

  const image = await fetchImage(trip.location);

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

export { createTrip, removeTrip };

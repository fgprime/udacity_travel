import { PIXABAY_APIKEY } from "./environment";
const PIXABAY_SERVICE = "https://pixabay.com/api/?";

async function fetchImage(location) {
  let queryParameter = {
    key: PIXABAY_APIKEY,
    q: location,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    order: "popular",
  };

  const url = `${PIXABAY_SERVICE}${new URLSearchParams(
    queryParameter,
  ).toString()}`;

  const response = await fetch(url);
  const images = await response.json();

  if (images?.hits?.length > 0) {
    return images.hits[0];
  } else {
    return { largeImageURL: "media/noimage.svg" };
  }
}

export { fetchImage };

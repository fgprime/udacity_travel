async function fetchImage(location) {
  const params = {
    location,
  };

  const url =
    "http://localhost:8081/api/images?" +
    new URLSearchParams(params).toString();

  const response = await fetch(url);
  const images = await response.json();

  return images;
}

export { fetchImage };

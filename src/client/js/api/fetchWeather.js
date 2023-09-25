async function fetchWeather(lat, lng, country, date) {
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

export { fetchWeather };

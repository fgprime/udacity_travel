import { WEATHERBIT_APIKEY } from "./environment";
const WEATHERBIT_SERVICE = "https://api.weatherbit.io/v2.0/forecast/daily?";

async function fetchWeather(lat, lng, country, date) {
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

  let queryParameter = {
    lat: lat,
    lon: lng,
    country: country,
    language: "en",
    start_date: date,
    end_date: formatedEndDate,
    units: "M",
    days: 1,
    key: WEATHERBIT_APIKEY,
  };

  const url = `${WEATHERBIT_SERVICE}${new URLSearchParams(
    queryParameter,
  ).toString()}`;

  const response = await fetch(url);
  const weatherDetail = await response.json();

  return {
    max_temp: weatherDetail?.data[0]?.max_temp,
    min_temp: weatherDetail?.data[0]?.min_temp,
    description: weatherDetail?.data[0]?.weather?.description,
  };
}

export { fetchWeather };

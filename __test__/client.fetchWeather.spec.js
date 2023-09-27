import { fetchWeather } from "../src/client/js/api/fetchWeather";

const input = {
  lat: "53.5521285714286",
  lng: "10.0004285714286",
  country: "DE",
  date: "2024-09-12",
};

const responseData = {
  city_name: "Altstadt",
  country_code: "DE",
  data: [
    {
      app_max_temp: 20.1,
      app_min_temp: 10.5,
      clouds: 38,
      clouds_hi: 79,
      clouds_low: 0,
      clouds_mid: 0,
      datetime: "2023-09-25",
      dewpt: 9.1,
      high_temp: 20.3,
      low_temp: 6.8,
      max_dhi: null,
      max_temp: 20.9,
      min_temp: 10.5,
      moon_phase: 0.837176,
      moon_phase_lunation: 0.37,
      moonrise_ts: 1695658625,
      moonset_ts: 1695600720,
      ozone: null,
      pop: 0,
      precip: 0,
      pres: 1022,
      rh: 63,
      slp: 1023.5,
      snow: 0,
      snow_depth: 0,
      sunrise_ts: 1695618599,
      sunset_ts: 1695661804,
      temp: 16.7,
      ts: 1695625260,
      uv: 0,
      valid_date: "2023-09-25",
      vis: null,
      weather: { code: 802, icon: "c02d", description: "Scattered clouds" },
      wind_cdir: "SSE",
      wind_cdir_full: "south-southeast",
      wind_dir: 157,
      wind_gust_spd: 5.9,
      wind_spd: 2.3,
    },
  ],
  lat: 53.5521,
  lon: 10.0004,
  state_code: "04",
  timezone: "Europe/Berlin",
};

//Description off how to mock fetch within JEST
//Code based on https://www.leighhalliday.com/mock-fetch-jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(responseData),
  }),
);

describe("Testing the client functionality", () => {
  test("Testing the fetchWeather() function", async () => {
    expect(fetchWeather).toBeDefined();

    const result = await fetchWeather(
      input.lat,
      input.lng,
      input.country,
      input.date,
    );

    console.dir(result);

    expect(result).toHaveProperty("max_temp");
    expect(result).toHaveProperty("min_temp");
    expect(result).toHaveProperty("description");
  });
});

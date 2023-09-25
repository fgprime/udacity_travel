import { fetchLocation } from "../src/client/js/api";

const city = "Hamburg";

const responseData = {
  postalcodes: [
    {
      adminCode2: "00",
      adminCode3: "02000",
      adminName3: "Hamburg, Freie und Hansestadt",
      adminCode1: "HH",
      lng: 10.0004285714286,
      countryCode: "DE",
      postalcode: "20095",
      adminName1: "Hamburg",
      placeName: "Hamburg",
      lat: 53.5521285714286,
    },
    {
      adminCode2: "00",
      adminCode3: "02000",
      adminName3: "Hamburg, Freie und Hansestadt",
      adminCode1: "HH",
      lng: 9.99528,
      countryCode: "DE",
      postalcode: "20095",
      adminName1: "Hamburg",
      placeName: "Hamburg Altstadt",
      lat: 53.5453,
    },
    {
      adminCode2: "00",
      adminCode3: "02000",
      adminName3: "Hamburg, Freie und Hansestadt",
      adminCode1: "HH",
      lng: 10.01938,
      countryCode: "DE",
      postalcode: "20097",
      adminName1: "Hamburg",
      placeName: "Hamburg",
      lat: 53.54805,
    },
  ],
};

//Description off how to mock fetch within JEST
//Code based on https://www.leighhalliday.com/mock-fetch-jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(responseData),
  }),
);

describe("Testing the server functionality", () => {
  test("Testing the fetchLocation() function", async () => {
    expect(fetchLocation).toBeDefined();

    const locationData = await fetchLocation(city);

    expect(locationData).toHaveProperty("postalCode");
    expect(locationData).toHaveProperty("country");
    expect(locationData).toHaveProperty("lat");
    expect(locationData).toHaveProperty("lng");
  });
});

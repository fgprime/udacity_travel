import { getData, updateData, removeData } from "../src/server/API";

let data = {
  id: "5505938d-79bb-43b3-9914-d573dc470d90",
  location: "Hamburg",
  date: "2024-09-12T00:00:00.000Z",
  lat: 53.5521285714286,
  lng: 10.0004285714286,
  country: "DE",
  max_temp: 23.6,
  min_temp: 11.7,
  description: "Scattered clouds",
  image:
    "https://pixabay.com/get/g369c82aca01abd165f491c98a1f4b05387e7c7c743f0cbd4006444127bed0cacdf92ceffeec63ee41ee209be99457bfe9717209ebf6c99171066faef488c7eb2_1280.jpg",
};

describe("Testing the server functionality", () => {
  test("Testing the updateTripAPI() function", async () => {
    expect(updateData).toBeDefined();

    const result = updateData(data);

    expect(result[0].id).toBe("5505938d-79bb-43b3-9914-d573dc470d90");
  });

  test("Testing the getData() function", async () => {
    expect(getData).toBeDefined();

    const result = getData();

    expect(result[0].id).toBe("5505938d-79bb-43b3-9914-d573dc470d90");
  });

  test("Testing the removeData() function", async () => {
    expect(removeData).toBeDefined();

    const result = removeData("5505938d-79bb-43b3-9914-d573dc470d90");

    expect(result.length).toBe(0);
  });

  test("Testing the getData() function", async () => {
    const result = getData();

    expect(result.length).toBe(0);
  });
});

let userData = [
  {
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
  },
];

function getData() {
  return userData;
}

function updateData(data) {
  const entry = {
    id: crypto.randomUUID(),
    ...data,
  };
  userData.push(entry);

  return getData();
}

function removeData(id) {
  userData = userData.filter((element) => {
    return element.id !== id;
  });

  return getData();
}

module.exports = { getData, updateData, removeData };

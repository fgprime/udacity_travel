async function getTripAPI() {
  return await fetch("http://localhost:8081/api", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function updateTripAPI(trips) {
  return await fetch("http://localhost:8081/api", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trips),
  });
}

async function removeTripAPI(id) {
  return await fetch("http://localhost:8081/api", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export { updateTripAPI, removeTripAPI, getTripAPI };

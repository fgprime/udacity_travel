// import { createTrip, removeTrip } from "./fetchData";

function addTripEvent() {
  const location = document.getElementById("location")?.value;
  const dateInputValue = document.getElementById("date")?.value;

  const date = new Date(dateInputValue);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  if (
    !(location?.length > 0 && dateInputValue?.length > 0 && date > yesterday)
  ) {
    alert("Please insert valid information for the trip");
    return;
  }

  const trip = {
    location,
    date,
  };

  Client.createTrip(trip);
}

function updateView(trips) {
  const root = document.getElementById("trips");
  root.innerHTML = "";

  for (const [index, trip] of trips.entries()) {
    createTripView(index, trip);
  }
}

function createTripView(index, trip) {
  const container = document.createElement("div");
  container.setAttribute("id", `trip-${index}`);
  container.classList.add("trip");

  const image = document.createElement("img");
  image.setAttribute("src", `${trip.image}`);

  const contentContainer = document.createElement("div");

  const headline = document.createElement("h2");
  headline.textContent = `My trip to: ${trip.location}`;

  const departure = document.createElement("h2");
  const date = new Intl.DateTimeFormat("de-DE").format(trip.date);
  departure.textContent = `Departing: ${date}`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove trip";
  removeButton.dataset.id = `${index}`;
  removeButton.addEventListener("click", (event) => {
    Client.removeTrip(event);
  });

  const MILLISECONDS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const dateDifference = Math.floor(
    (new Date(trip.date) - new Date()) /
    (HOURS_IN_DAY *
      MINUTES_IN_HOUR *
      SECONDS_IN_MINUTE *
      MILLISECONDS_IN_SECOND),
  );
  const countdown = document.createElement("p");

  countdown.textContent = `${trip.location} is ${dateDifference} days away`;

  const weather = document.createElement("p");
  weather.textContent = `Typical weahter for then is: High - ${trip.max_temp}°C, Low - ${trip.min_temp}°C ${trip.description}`;

  container.appendChild(image);
  contentContainer.appendChild(headline);
  contentContainer.appendChild(departure);
  contentContainer.appendChild(removeButton);
  contentContainer.appendChild(countdown);
  contentContainer.appendChild(weather);
  container.appendChild(contentContainer);

  const root = document.getElementById("trips");

  root.appendChild(container);
}

export { updateView, addTripEvent };

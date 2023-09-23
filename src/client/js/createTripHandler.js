import { updateView } from "./updateView";

let trips = [];
function createTrip(trip) {
  trips.push(trip);

  console.dir(trips);

  Client.updateView();
}

function createTripHandler() {
  const location = document.getElementById("location")?.value;
  const dateInputValue = document.getElementById("date")?.value;

  const date = new Date(dateInputValue);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  if (
    !(location?.length > 0 && dateInputValue?.length > 0 && date >= yesterday)
  ) {
    alert("Please insert valid information for the trip");
    return;
  }

  const trip = {
    location,
    date,
  };

  createTrip(trip);
}
export { createTripHandler };

import { addTripEvent } from "./updateView";

window.addEventListener("load", () => {
  const saveTripButton = document.getElementById("saveTrip");
  saveTripButton.addEventListener("click", addTripEvent);
});

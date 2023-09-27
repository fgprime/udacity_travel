window.addEventListener("load", () => {
  const saveTripButton = document.getElementById("saveTrip");
  saveTripButton.addEventListener("click", Client.addTripEvent);
});

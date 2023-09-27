import { getTripAPI } from "./api/persistence";

window.addEventListener("load", async () => {
  const response = await getTripAPI();
  const trips = await response.json();

  console.dir(trips);

  Client.updateView(trips);
});

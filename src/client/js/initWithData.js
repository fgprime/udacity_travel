import { getTripAPI } from "./api/persistence";
import { updateView } from "./updateView";

window.addEventListener("load", async () => {
  const response = await getTripAPI();
  const trips = await response.json();

  updateView(trips);
});

import { QuickEvent } from "../create_configuration_modal/create_configuration_modal";

function downloadConfiguration(events: QuickEvent[]) {
  const content = JSON.stringify(events);
  const eventsBlob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(eventsBlob);
  const link = document.createElement("a");
  link.download = "events.json";
  link.href = url;
  link.click();
}

export default downloadConfiguration;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AvailabilityProvider } from "./context/MainValues";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AvailabilityProvider>
      <App />
    </AvailabilityProvider>
  </React.StrictMode>,
);

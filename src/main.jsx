import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap-icons/font/bootstrap-icons.css";
import "overlayscrollbars/styles/overlayscrollbars.css";
import "admin-lte/dist/css/adminlte.min.css";

import "bootstrap";
import "admin-lte";

import App from "./App.jsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

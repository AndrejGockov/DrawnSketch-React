import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom/BrowserRouter";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n.js";

//Pages
import App from "./App";

//Css
import "./style/css/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

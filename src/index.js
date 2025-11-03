import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // or remove if you don’t want globals

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
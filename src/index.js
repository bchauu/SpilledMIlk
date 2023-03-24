import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App";
// import ".global";
import "./scss/app"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
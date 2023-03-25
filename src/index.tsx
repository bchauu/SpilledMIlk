// import React from "react";
// import { createRoot } from "react-dom/client"
// import App from "./App";
// // import ".global";
// import "./scss/app"

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App/>);

import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./scss/app"

const root = createRoot(document.getElementById("root"));
root.render(<App/>);

// ReactDOM.render(<App/>, document.getElementById("root"));
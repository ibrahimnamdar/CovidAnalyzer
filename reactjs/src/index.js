import React from "react";
import { render } from "react-dom";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

const rootElement = document.getElementById("root");
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

render(<App />, rootElement);

registerServiceWorker();

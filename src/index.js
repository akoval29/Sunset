import React from "react";
import { createRoot } from "react-dom/client";

// import "./style/style.css";

import { App } from "./components/app/App";

const root = document.getElementById("app");

createRoot(root).render(<App />);

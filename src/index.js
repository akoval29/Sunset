import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components/app/App";

const root = document.getElementById("app");

createRoot(root).render(<App />);

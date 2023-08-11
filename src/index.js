import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App";
import store from "./store";

const root = document.getElementById("app");
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);

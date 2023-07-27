import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./pages/app/App";
import store from "./redux/store";

const root = document.getElementById("app");
createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

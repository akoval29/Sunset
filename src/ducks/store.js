import { configureStore } from "@reduxjs/toolkit";

import posts from "./postSlice";
import todos from "./todoSlice";
import users from "./userSlice";

const store = configureStore({
  reducer: { posts, todos, users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

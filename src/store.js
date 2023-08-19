import { configureStore } from "@reduxjs/toolkit";

import posts from "./ducks/postSlice";
import todos from "./ducks/todoSlice";
import users from "./ducks/userSlice";

const store = configureStore({
  reducer: { posts, todos, users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

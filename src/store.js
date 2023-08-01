import { configureStore } from "@reduxjs/toolkit";

import posts from "./components/pages/posts-page/postSlice";
import todos from "./components/pages/todos-page/todoSlice";
import users from "./components/pages/users-page/userSlice";

const store = configureStore({
  reducer: { posts, todos, users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

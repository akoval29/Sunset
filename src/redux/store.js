import { configureStore } from "@reduxjs/toolkit";

import posts from "../pages/posts-page/postSlice";
import todos from "../pages/todos-page/todoSlice";
import users from "../pages/users-page/userSlice";

const store = configureStore({
  reducer: { posts, todos, users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// const stringMiddleWare = () => (next) => (action) => {
//   if (typeof action === "string") {
//     return next({
//       type: action,
//     });
//   }
//   return next(action);
// };

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(stringMiddleWare),
//   devTools: process.env.NODE_ENV !== "production",
// });

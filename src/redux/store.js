// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { postReducer } from "./redusers";
import { todoReducer } from "./redusers";
import { userReducer } from "./redusers";

const rootReducer = combineReducers({
  posts: postReducer,
  todos: todoReducer,
  users: userReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

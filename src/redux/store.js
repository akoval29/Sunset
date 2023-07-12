// store.js
import { configureStore } from "@reduxjs/toolkit";

import { postReducer } from "./redusers";

const rootReducer = { posts: postReducer };

const store = configureStore({ reducer: rootReducer });

export default store;

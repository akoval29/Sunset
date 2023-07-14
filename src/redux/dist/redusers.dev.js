"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoReducer = exports.userReducer = exports.postReducer = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  posts: [],
  postsLoadingStatus: "idle",
  users: [],
  usersLoadingStatus: "idle",
  todos: [],
  todosLoadingStatus: "idle"
};

var postReducer = function postReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "POSTS_FETCHING":
      return _objectSpread({}, state, {
        postsLoadingStatus: "loading"
      });

    case "POSTS_FETCHED":
      return _objectSpread({}, state, {
        posts: action.payload,
        postsLoadingStatus: "idle"
      });

    case "POSTS_FETCHING_ERROR":
      return _objectSpread({}, state, {
        postsLoadingStatus: "error"
      });

    case "POSTS_CREATED":
      return _objectSpread({}, state);

    case "POSTS_DELETED":
      return _objectSpread({}, state);

    default:
      return state;
  }
};

exports.postReducer = postReducer;

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "USERS_FETCHING":
      return _objectSpread({}, state, {
        usersLoadingStatus: "loading"
      });

    case "USERS_FETCHED":
      return _objectSpread({}, state, {
        users: action.payload,
        usersLoadingStatus: "idle"
      });

    case "USERS_FETCHING_ERROR":
      return _objectSpread({}, state, {
        usersLoadingStatus: "error"
      });

    case "USERS_CREATED":
      return _objectSpread({}, state);

    case "USERS_DELETED":
      return _objectSpread({}, state);

    default:
      return state;
  }
};

exports.userReducer = userReducer;

var todoReducer = function todoReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "TODOS_FETCHING":
      return _objectSpread({}, state, {
        todosLoadingStatus: "loading"
      });

    case "TODOS_FETCHED":
      return _objectSpread({}, state, {
        todos: action.payload,
        todosLoadingStatus: "idle"
      });

    case "TODOS_FETCHING_ERROR":
      return _objectSpread({}, state, {
        todosLoadingStatus: "error"
      });

    case "TODOS_CREATED":
      return _objectSpread({}, state);

    case "TODOS_DELETED":
      return _objectSpread({}, state);

    default:
      return state;
  }
};

exports.todoReducer = todoReducer;
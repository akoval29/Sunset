const initialState = {
  posts: [],
  postsLoadingStatus: "idle",
  users: [],
  usersLoadingStatus: "idle",
  todos: [],
  todosLoadingStatus: "idle",
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POSTS_FETCHING":
      return {
        ...state,
        postsLoadingStatus: "loading",
      };
    case "POSTS_FETCHED":
      return {
        ...state,
        posts: action.payload,
        postsLoadingStatus: "idle",
      };
    case "POSTS_FETCHING_ERROR":
      return {
        ...state,
        postsLoadingStatus: "error",
      };
    case "POSTS_CREATED":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "POSTS_DELETED":
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_FETCHING":
      return {
        ...state,
        usersLoadingStatus: "loading",
      };
    case "USERS_FETCHED":
      return {
        ...state,
        users: action.payload,
        usersLoadingStatus: "idle",
      };
    case "USERS_FETCHING_ERROR":
      return {
        ...state,
        usersLoadingStatus: "error",
      };
    case "USERS_CREATED":
      return {
        ...state,
        // users: [...state.users, action.payload],
      };
    case "USERS_DELETED":
      return {
        ...state,
        // users: state.users.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TODOS_FETCHING":
      return {
        ...state,
        todosLoadingStatus: "loading",
      };
    case "TODOS_FETCHED":
      return {
        ...state,
        todos: action.payload,
        todosLoadingStatus: "idle",
      };
    case "TODOS_FETCHING_ERROR":
      return {
        ...state,
        todosLoadingStatus: "error",
      };
    case "TODOS_CREATED":
      return {
        ...state,
        // todos: [...state.todos, action.payload],
      };
    case "TODOS_DELETED":
      return {
        ...state,
        // todos: state.todos.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const PostsinitialState = {
  posts: [],
  postsLoadingStatus: "idle",
};

export const postReducer = (state = PostsinitialState, action) => {
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
        // posts: [...state.posts, action.payload],
      };
    case "POSTS_DELETED":
      return {
        ...state,
        // posts: state.posts.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

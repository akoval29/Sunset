export const postsFetching = () => {
  return {
    type: "POSTS_FETCHING",
  };
};

export const postsFetched = (posts) => {
  return {
    type: "POSTS_FETCHED",
    payload: posts,
  };
};

export const postsFetchingError = () => {
  return {
    type: "POSTS_FETCHING_ERROR",
  };
};

export const postsCreated = (post) => {
  return {
    type: "POSTS_CREATED",
    payload: post,
  };
};

export const postsDeleted = (id) => {
  return {
    type: "POSTS_DELETED",
    payload: id,
  };
};

// ---------------------------------------------------  //

export const todosFetching = () => {
  return {
    type: "TODOS_FETCHING",
  };
};

export const todosFetched = (todos) => {
  return {
    type: "TODOS_FETCHED",
    payload: todos,
  };
};

export const todosFetchingError = () => {
  return {
    type: "TODOS_FETCHING_ERROR",
  };
};

// ---------------------------------------------------  //

export const usersFetching = () => {
  return {
    type: "USERS_FETCHING",
  };
};

export const usersFetched = (users) => {
  return {
    type: "USERS_FETCHED",
    payload: users,
  };
};

export const usersFetchingError = () => {
  return {
    type: "USERS_FETCHING_ERROR",
  };
};

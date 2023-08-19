import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";

const url = "https://jsonplaceholder.typicode.com";
const postsAdapter = createEntityAdapter();

// Отримуємо дані з локального сховища
const getPostsFromLocalStorage = () => {
  const postsData = localStorage.getItem("posts");
  if (postsData) {
    return JSON.parse(postsData);
  }
  return null;
};

// Зберігаємо дані у локальне сховище
const savePostsToLocalStorage = (data) => {
  localStorage.setItem("posts", JSON.stringify(data));
};

// Отримуєм post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { request } = useHttp();

  // Повертаємо дані з локального сховища,
  // якщо вони є і на вихід з функції fetchPosts
  const cachedPosts = getPostsFromLocalStorage();
  if (cachedPosts) {
    return cachedPosts;
  }

  const response = await request(`${url}/posts`);
  savePostsToLocalStorage(response);
  return response;
});

// Новий post
export const createPost = createAsyncThunk("posts/createPost", (newPost) => {
  const cachedPosts = getPostsFromLocalStorage();
  const updatedPosts = [...cachedPosts, newPost];
  savePostsToLocalStorage(updatedPosts);
  return newPost;
});

// Видаляєм post
export const deletePost = createAsyncThunk("posts/deletePost", (postId) => {
  const cachedPosts = getPostsFromLocalStorage();
  const updatedPosts = cachedPosts.filter((post) => post.id !== postId);
  savePostsToLocalStorage(updatedPosts);
  return postId;
});

// Редагуєм post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  ({ postId, updatedPost }) => {
    const cachedPosts = getPostsFromLocalStorage();
    const updatedPosts = cachedPosts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    savePostsToLocalStorage(updatedPosts);
    return { postId, updatedPost };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    postsLoadingStatus: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoadingStatus = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsLoadingStatus = "idle";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsLoadingStatus = "error";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { postId, updatedPost } = action.payload;
        postsAdapter.updateOne(state, {
          id: postId,
          changes: updatedPost,
        });
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = postsAdapter.getSelectors((state) => state.posts);
export const allPostsSelector = createSelector(selectAll, (posts) => posts);
const { reducer } = postsSlice;
export default reducer;

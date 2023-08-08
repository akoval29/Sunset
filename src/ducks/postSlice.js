import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";
import { url } from "../hooks/useAPI";

const postsAdapter = createEntityAdapter();

// Отримуєм post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { request } = useHttp();
  return await request(`${url}/posts`);
});

// Нове post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    const { request } = useHttp();
    const response = await request(
      `${url}/posts`,
      "POST",
      JSON.stringify(newPost)
    );
    return response;
  }
);

// Видаляєм post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const { request } = useHttp();
    await request(`${url}/posts/${postId}`, "DELETE");
    return postId;
  }
);

// Редагуєм post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updatedPost }) => {
    const { request } = useHttp();
    await request(
      `${url}/posts/${postId}`,
      "PATCH",
      JSON.stringify(updatedPost)
    );
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

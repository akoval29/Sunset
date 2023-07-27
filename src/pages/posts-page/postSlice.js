import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../shared/useAPI";

const postsAdapter = createEntityAdapter();

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { request } = useHttp();
  return await request("https://jsonplaceholder.typicode.com/posts");
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    postsLoadingStatus: "idle",
  }),
  reducers: {
    postsCreated: (state, action) => {
      postsAdapter.addOne(state, action.payload);
    },
    postsDeleted: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
  },
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
      .addDefaultCase(() => {});
  },
});

const { selectAll } = postsAdapter.getSelectors((state) => state.posts);
export const allPostsSelector = createSelector(selectAll, (posts) => posts);

const { actions, reducer } = postsSlice;
export default reducer;

export const {
  postsFetching,
  postsFetched,
  postsFetchingError,
  postsCreated,
  postsDeleted,
} = actions;

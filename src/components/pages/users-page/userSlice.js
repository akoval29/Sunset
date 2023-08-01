import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useAPI";

const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { request } = useHttp();
  return await request("https://jsonplaceholder.typicode.com/users");
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    usersLoadingStatus: "idle",
  }),
  reducers: {
    usersCreated: (state, action) => {
      usersAdapter.addOne(state, action.payload);
    },
    usersDeleted: (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadingStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoadingStatus = "idle";
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = usersAdapter.getSelectors((state) => state.users);
export const allUsersSelector = createSelector(selectAll, (users) => users);

const { actions, reducer } = usersSlice;
export default reducer;

export const {
  usersFetching,
  usersFetched,
  usersFetchingError,
  usersCreated,
  usersDeleted,
} = actions;

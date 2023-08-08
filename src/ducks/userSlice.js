import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";
import { url } from "../hooks/useAPI";

const usersAdapter = createEntityAdapter();

// Отримуєм user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { request } = useHttp();
  return await request(`${url}/users`);
});

// Нове user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const { request } = useHttp();
    const response = await request(
      `${url}/users`,
      "POST",
      JSON.stringify(newUser)
    );
    return response;
  }
);

// Видаляєм user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const { request } = useHttp();
    await request(`${url}/users/${userId}`, "DELETE");
    return userId;
  }
);

// Редагуєм user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updatedUser }) => {
    const { request } = useHttp();
    await request(
      `${url}/users/${userId}`,
      "PATCH",
      JSON.stringify(updatedUser)
    );
    return { userId, updatedUser };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    usersLoadingStatus: "idle",
  }),
  reducers: {},
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
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { userId, updatedUser } = action.payload;
        usersAdapter.updateOne(state, {
          id: userId,
          changes: updatedUser,
        });
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = usersAdapter.getSelectors((state) => state.users);
export const allUsersSelector = createSelector(selectAll, (users) => users);
const { reducer } = usersSlice;
export default reducer;

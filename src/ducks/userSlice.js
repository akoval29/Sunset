import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";

const url = "https://jsonplaceholder.typicode.com";
const usersAdapter = createEntityAdapter();

// reusable - Отримуємо дані з локального сховища
const getUsersFromLocalStorage = () => {
  const usersData = localStorage.getItem("users");
  if (usersData) {
    return JSON.parse(usersData);
  }
  return null;
};

// reusable - Зберігаємо дані у локальне сховище
const saveUsersToLocalStorage = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

//Отримуєм деталі
export const fetchDetails = createAsyncThunk(
  "users/fetchDetails",
  async ({ userId }) => {
    const { request } = useHttp();

    try {
      const cachedUsers = getUsersFromLocalStorage();

      if (cachedUsers[userId - 1].posts) {
        return { userId, userWithDetails: cachedUsers[userId - 1] };
      }

      const response1 = await request(`${url}/users/${userId}/posts`);
      const response2 = await request(`${url}/users/${userId}/todos`);
      const response3 = await request(`${url}/users/${userId}/albums`);

      const userWithDetails = {
        ...cachedUsers[userId - 1],
        posts: response1,
        todos: response2,
        albums: response3,
      };

      //  ТИПІЗАЦІЯ ДАНИХ !!!!!!!!!!!
      const updatedUsers = cachedUsers.map((user) =>
        user.id === Number(userId) ? { ...user, ...userWithDetails } : user
      );

      saveUsersToLocalStorage(updatedUsers);

      return { userId, userWithDetails };
    } catch (error) {
      throw error;
    }
  }
);

// Отримуєм user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { request } = useHttp();

  // Перевіряємо локальне сховище, якщо даані є
  // то - на вихід з функції fetchUsers
  const cachedUsers = getUsersFromLocalStorage();
  if (cachedUsers) {
    return cachedUsers;
  }

  const response = await request(`${url}/users`);
  console.log(response);
  saveUsersToLocalStorage(response);
  return response;
});

// Новий user
export const createUser = createAsyncThunk("users/createUser", (newUser) => {
  const cachedUsers = getUsersFromLocalStorage();
  const updatedUsers = [...cachedUsers, newUser];
  saveUsersToLocalStorage(updatedUsers);
  return newUser;
});

// Видаляєм user
export const deleteUser = createAsyncThunk("users/deleteUser", (userId) => {
  const cachedUsers = getUsersFromLocalStorage();
  const updatedUsers = cachedUsers.filter((user) => user.id !== userId);
  saveUsersToLocalStorage(updatedUsers);
  return userId;
});

// Редагуєм user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  ({ userId, updatedUser }) => {
    const cachedUsers = getUsersFromLocalStorage();
    const updatedUsers = cachedUsers.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user
    );
    saveUsersToLocalStorage(updatedUsers);
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
      .addCase(fetchDetails.pending, (state) => {
        state.usersLoadingStatus = "loading";
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.usersLoadingStatus = "error";
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.usersLoadingStatus = "idle";
        const { userId, userWithDetails } = action.payload;
        usersAdapter.updateOne(state, {
          id: userId,
          changes: userWithDetails,
        });
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = usersAdapter.getSelectors((state) => state.users);
export const allUsersSelector = createSelector(selectAll, (users) => users);
const { reducer } = usersSlice;
export default reducer;

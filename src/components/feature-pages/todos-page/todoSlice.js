import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useAPI";

const todosAdapter = createEntityAdapter();

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { request } = useHttp();
  return await request("https://jsonplaceholder.typicode.com/todos");
});

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    todosLoadingStatus: "idle",
  }),
  reducers: {
    todosCreated: (state, action) => {
      todosAdapter.addOne(state, action.payload);
    },
    todosDeleted: (state, action) => {
      todosAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.todosLoadingStatus = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todosLoadingStatus = "idle";
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.todosLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = todosAdapter.getSelectors((state) => state.todos);
export const allTodosSelector = createSelector(selectAll, (todos) => todos);

const { actions, reducer } = todosSlice;
export default reducer;

export const {
  todosFetching,
  todosFetched,
  todosFetchingError,
  todosCreated,
  todosDeleted,
} = actions;

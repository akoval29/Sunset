import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";

const url = "https://jsonplaceholder.typicode.com";
const todosAdapter = createEntityAdapter();

// Отримуєм todo
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { request } = useHttp();
  return await request(`${url}/todos`);
});

// Нове todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo) => {
    const { request } = useHttp();
    const response = await request(
      `${url}/todos`,
      "POST",
      JSON.stringify(newTodo)
    );
    return response;
  }
);

// Видаляєм todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    const { request } = useHttp();
    await request(`${url}/todos/${todoId}`, "DELETE");
    return todoId;
  }
);

// Редагуєм todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, updatedTodo }) => {
    const { request } = useHttp();
    await request(
      `${url}/todos/${todoId}`,
      "PATCH",
      JSON.stringify(updatedTodo)
    );
    return { todoId, updatedTodo };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    todosLoadingStatus: "idle",
  }),
  reducers: {},
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
      .addCase(createTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { todoId, updatedTodo } = action.payload;
        todosAdapter.updateOne(state, {
          id: todoId,
          changes: updatedTodo,
        });
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = todosAdapter.getSelectors((state) => state.todos);
export const allTodosSelector = createSelector(selectAll, (todos) => todos);
const { reducer } = todosSlice;
export default reducer;

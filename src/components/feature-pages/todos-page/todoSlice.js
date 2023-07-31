import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useAPI";

const todosAdapter = createEntityAdapter();

// Отримуєм todo
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { request } = useHttp();
  return await request("https://jsonplaceholder.typicode.com/todos");
});

// Видаляєм todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    const { request } = useHttp();
    await request(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      "DELETE"
    );
    return todoId;
  }
);

// Редагуєм todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, updatedTodo }) => {
    // const { request } = useHttp();
    // await request(
    //   `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    //   "PUT",
    //   updatedTodo
    // );
    return { todoId, updatedTodo };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    todosLoadingStatus: "idle",
    deletedTodoIds: [],
  }),
  reducers: {
    todosCreated: (state, action) => {
      todosAdapter.addOne(state, action.payload);
    },
    todoDeleted: (state, action) => {
      todosAdapter.removeOne(state, action.payload);
      state.deletedTodoIds.push(action.payload.id);
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
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deletedTodoIds = [...state.deletedTodoIds, action.payload];
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, title, completed } = action.payload.updatedTodo;
        const existingTodo = state.entities[id];
        if (existingTodo) {
          existingTodo.title = title;
          existingTodo.completed = completed;
        }
      })
      .addDefaultCase(() => {});
  },
});

const { selectAll } = todosAdapter.getSelectors((state) => state.todos);
export const allTodosSelector = createSelector(selectAll, (todos) => todos);
const { actions, reducer } = todosSlice;
export default reducer;

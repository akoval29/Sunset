import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useAPI";

const url = "https://jsonplaceholder.typicode.com";
const todosAdapter = createEntityAdapter();

// Отримуємо дані з локального сховища
const getTodosFromLocalStorage = () => {
  const todosData = localStorage.getItem("todos");
  if (todosData) {
    return JSON.parse(todosData);
  }
  return null;
};

// Зберігаємо дані у локальне сховище
const saveTodosToLocalStorage = (data) => {
  localStorage.setItem("todos", JSON.stringify(data));
};

// Отримуєм todo
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { request } = useHttp();

  // Повертаємо дані з локального сховища,
  // якщо вони є і на вихід з функції fetchTodos
  const cachedTodos = getTodosFromLocalStorage();
  if (cachedTodos) {
    return cachedTodos;
  }

  const response = await request(`${url}/todos`);
  saveTodosToLocalStorage(response);
  return response;
});

// Новий todo
export const createTodo = createAsyncThunk("todos/createTodo", (newTodo) => {
  const cachedTodos = getTodosFromLocalStorage();
  const updatedTodos = [...cachedTodos, newTodo];
  saveTodosToLocalStorage(updatedTodos);
  return newTodo;
});

// Видаляєм todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", (todoId) => {
  const cachedTodos = getTodosFromLocalStorage();
  const updatedTodos = cachedTodos.filter((todo) => todo.id !== todoId);
  saveTodosToLocalStorage(updatedTodos);
  return todoId;
});

// Редагуєм todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  ({ todoId, updatedTodo }) => {
    const cachedTodos = getTodosFromLocalStorage();
    const updatedTodos = cachedTodos.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    saveTodosToLocalStorage(updatedTodos);
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

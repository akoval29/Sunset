import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, allTodosSelector, deleteTodo } from "./todoSlice.js";

// commons
// import { EditTodo } from "../../common/editForms/todoEditForm.js";
import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";

//icon
import wrenchIcon from "../../../lib/wrench-icon.png";

//style
import "./todoStyle.scss";

export const Todos = () => {
  const allTodos = useSelector(allTodosSelector);
  const { todosLoadingStatus, deletedTodoIds } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todosLoadingStatus === "loading") {
    return <Spinner />;
  } else if (todosLoadingStatus === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

  const onDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
    console.log(`todo №${todoId} deleted`);
  };

  const onEdit = (todoId) => {
    console.log(`todo №${todoId} edited ?`);
  };

  const getCompletedColor = (completed) => {
    return completed ? "greenyellow" : "red";
  };

  const filteredTodos = allTodos.filter(
    (todo) => !deletedTodoIds.includes(todo.id)
  );

  return (
    <article className="app__main">
      <h3 className="app__main-title">Todos</h3>
      {filteredTodos.map((item) => (
        <div className="post" key={item.id}>
          <div className="todo__wrap">
            <p className="todo__userId">User № {item.userId}</p>
            <p className="todo__todoId">todo № {item.id}</p>
            <div className="todo__edit-wrap">
              <button
                className="todo__wrench-wrap"
                onClick={() => onEdit(item.id)}
              >
                <img
                  src={wrenchIcon}
                  className="todo__wrench"
                  alt="wrench-icon"
                />
              </button>
              <button
                className="todo__cross-wrap"
                onClick={() => onDelete(item.id)}
              >
                <span className="todo__cross">✕</span>
              </button>
            </div>
          </div>

          <div className="todo__container">
            <h4 className="todo__title">{item.title}</h4>
            <p
              className="todo__completed"
              style={{ color: getCompletedColor(item.completed) }}
            >
              {item.completed.toString()}
            </p>
          </div>
        </div>
      ))}

      <ScrollTo />
    </article>
  );
};

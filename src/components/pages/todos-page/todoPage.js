import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, allTodosSelector, deleteTodo } from "./todoSlice.js";

// commons
import { EditTodo } from "../../common/editForms/todoEditForm.js";
import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";
import { AddForm } from "../../common/addForms/addForm.js";

//style
import "./todoStyle.scss";

export const Todos = () => {
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowEditTodo(true);
    console.log(`todo №${item.id} edited?`);
  };

  const getCompletedColor = (completed) => {
    return completed ? "greenyellow" : "red";
  };

  const filteredTodos = allTodos.filter(
    (item) => !deletedTodoIds.includes(item.id)
  );
  console.log(filteredTodos);

  return (
    <article className="app__main">
      <h3 className="app__main-title">Todos</h3>
      {filteredTodos.map((item) => (
        <div className="post" key={item.id}>
          <div className="todo__wrap">
            <p className="todo__userId">User № {item.userId}</p>
            <p className="todo__todoId">todo № {item.id}</p>
            <div className="todo__edit-wrap">
              <button className="todo__item-wrap" onClick={() => onEdit(item)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3524/3524762.png"
                  className="todo__item"
                  alt="wrench-icon"
                />
              </button>
              <button
                className="todo__item-wrap"
                onClick={() => onDelete(item.id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                  className="todo__item"
                  alt="cross-icon"
                />
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
      <EditTodo
        showEditTodo={showEditTodo}
        setShowEditTodo={setShowEditTodo}
        selectedItem={selectedItem}
      />
      <ScrollTo />
      <AddForm flag="todo" />
    </article>
  );
};

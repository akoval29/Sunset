import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  fetchTodos,
  allTodosSelector,
  deleteTodo,
} from "../../../ducks/todoSlice";

// commons
import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";
import { TodoEditForm } from "../../common/Forms/todoForms/TodoEditForm";
import { TodoAddForm } from "../../common/Forms/todoForms/TodoAddForm";
import { ErrorMessage } from "../../common/error/errorMessage";

//style
import "./todoStyle.scss";

export const Todos = () => {
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const allTodos = useSelector(allTodosSelector);
  const todosLoadingStatus = useSelector(
    (state) => state.todos.todosLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todosLoadingStatus === "loading") {
    return <Spinner />;
  } else if (todosLoadingStatus === "error") {
    return <ErrorMessage />;
  }

  const onDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowEditTodo(true);
  };

  if (allTodos.length === 0) {
    return (
      <ul
        className="app__main"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 className="app__main-title">Todos</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/42/42849.png"
          className=""
          alt="noTodos"
        />
      </ul>
    );
  }

  const getCompletedColor = (completed) => {
    return completed ? "greenyellow" : "red";
  };

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Todos</h3>
      <TransitionGroup>
        {allTodos.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames={"todo"}
            unmountOnExit
          >
            <li className="todo" key={item.id}>
              <div className="todo__wrap">
                <p className="todo__userId">User № {item.userId}</p>
                <p className="todo__todoId">todo № {item.id}</p>
                <div className="todo__edit-wrap">
                  <button className="todo__btn" onClick={() => onEdit(item)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3524/3524762.png"
                      className="todo__item"
                      alt="wrench-icon"
                    />
                  </button>

                  <button
                    className="todo__btn"
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
                  {item.completed?.toString()}
                </p>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <TodoEditForm
        showEditTodo={showEditTodo}
        setShowEditTodo={setShowEditTodo}
        selectedItem={selectedItem}
      />
      <TodoAddForm />
      <ScrollTo />
    </ul>
  );
};

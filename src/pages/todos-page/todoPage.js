import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/useAPI";

import { Add } from "../../features/add/add";
import { ScrollTo } from "../../features/scroll/pageScroll";
import { Spinner } from "../../features/loading/spinner";

import {
  todosFetching,
  todosFetched,
  todosFetchingError,
} from "../../redux/actions";

import "./todoStyle.scss";

export const Todos = () => {
  const { todos, todosLoadingStatus } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(todosFetching());
    request("https://jsonplaceholder.typicode.com/todos")
      .then((data) => dispatch(todosFetched(data)))
      .catch(() => dispatch(todosFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (todosLoadingStatus === "loading") {
    return <Spinner />;
  } else if (todosFetchingError === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

  const getCompletedColor = (completed) => {
    return completed ? "greenyellow" : "red";
  };

  return (
    <article className="app__main">
      <h3 className="app__main-title">Todos</h3>
      {todos.map((item) => (
        <div className="todo" key={item.id}>
          <div className="todo__wrap">
            <p className="todo__userId">User № {item.userId}</p>
            <p className="todo__todoId">todo № {item.id}</p>
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
      <Add item="todo" />
      <ScrollTo />
    </article>
  );
};

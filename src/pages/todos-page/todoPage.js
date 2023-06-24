import React, { useEffect, useState } from "react";

import { getInfo } from "../../shared/useAPI";

import "./todoStyle.css";

export const Todos = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfo("todos");
        if (response) {
          setTodoItems(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getCompletedColor = (completed) => {
    return completed ? "greenyellow" : "red";
  };

  return (
    <article className="app__main">
      <h3 className="app__main-title">Todos</h3>
      {todoItems.map((item) => (
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
    </article>
  );
};

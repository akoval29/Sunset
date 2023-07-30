import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./editStyle.scss";

import { todosCreated } from "../../redux/actions/TodoActions";

import userIcon from "../../assets/user.png";

export const EditTodo = ({ item }) => {
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  // показати/сховати модальне вікно з textarea
  function onShow() {
    setShowNewTodo((prevState) => !prevState);
  }

  // записуєм в стейт текст нового TITLE
  function onTextChange(event) {
    setNewTodoText(event.target.value);
  }

  // записуєм в стейт чекбокса
  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  // обробник подій для кнопки "submit"
  async function onTodoButtonClick() {
    if (newTodoText.trim() !== "") {
      setShowNewTodo((prevState) => !prevState);
      const newTodo = {
        userId: 999,
        id: uuidv4().substring(0, 5),
        title: newTodoText,
        completed: isChecked,
      };

      // try {
      //   const response = await request(
      //     "https://jsonplaceholder.typicode.com/todos",
      //     "POST",
      //     JSON.stringify(newTodo)
      //   );
      //   if (!response) {
      //     throw new Error("Failed to add a new Todo.");
      //   }

      //   dispatch(todosCreated(newTodo));
      //   setNewTodoText(""); // Очищуємо текстове поле
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }
  return (
    <article>
      {showNewTodo ? (
        <div className="newEntry newEntry--show">
          <section className="newEntry__wrap">
            <div className="newEntry__userWrap">
              <img
                className="newEntry__userImg"
                src={userIcon}
                alt="userIcon"
              />
              <p className="newEntry__userName">User 999</p>
            </div>
            <textarea
              className="newEntry__textarea"
              id="newText"
              placeholder={`Write new ${item}`}
              value={newTodoText}
              onChange={onTextChange}
            ></textarea>

            <div className="checkBox">
              <input
                type="checkbox"
                id="switch"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={`checkBox__input ${
                  isChecked ? "checkBox--act" : "checkBox--disAct"
                }`}
              ></input>
              <label className="checkBox__label" htmlFor="switch">
                Autoplay
              </label>
            </div>
          </section>

          <button className="newEntry__btn" onClick={onTodoButtonClick}>
            {`Submit ${item}`}
          </button>

          <div className="newEntry__cross-wrap" onClick={onShow}>
            <span className="newEntry__cross">✕</span>
          </div>
        </div>
      ) : (
        <div className="edit" onClick={onShow}>
          <div className="edit__cross-wrap">
            <span className="edit__cross">✕</span>
          </div>
          <div className="edit__message-wrap">
            <div className="edit__message">Add new {item}</div>
          </div>
        </div>
      )}
    </article>
  );
};

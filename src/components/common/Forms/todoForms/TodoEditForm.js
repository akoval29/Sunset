import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import "../editStyle.scss";

import { updateTodo } from "../../../../ducks/todoSlice";

export const TodoEditForm = ({
  showEditTodo,
  setShowEditTodo,
  selectedItem,
}) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  // Оновлюємо стан після отримання selectedItem
  useEffect(() => {
    setNewTodoText(selectedItem?.title || "");
    setIsChecked(selectedItem?.completed || false);
  }, [selectedItem]);

  // показати/сховати модальне вікно з textarea
  function onShow() {
    setShowEditTodo((prevState) => !prevState);
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
  function onTodoSubmitBtn() {
    if (newTodoText.trim() !== "") {
      const updatedTodo = {
        userId: selectedItem.userId,
        id: selectedItem.id,
        title: newTodoText,
        completed: isChecked,
      };
      dispatch(updateTodo({ todoId: selectedItem.id, updatedTodo }));
      setShowEditTodo((prevState) => !prevState);
    }
  }

  return (
    <>
      <CSSTransition
        in={showEditTodo}
        timeout={300}
        classNames="newEntry"
        unmountOnExit
      >
        <div className="newEntry">
          <section className="newEntry__column">
            <div className="newEntry__row">
              <div className="newEntry__user">
                <img
                  className="newEntry__userImg"
                  src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                  alt="userIcon"
                />
                <p className="newEntry__userName">
                  User №{selectedItem?.userId} / post №{selectedItem?.id}
                </p>
              </div>
              <button className="newEntry__closeBtn" onClick={onShow}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                  className="newEntry__crossImg"
                  alt="cross-icon"
                />
              </button>
            </div>
            <textarea
              className="newEntry__textarea"
              id="newText"
              value={newTodoText}
              onChange={onTextChange}
              autoFocus
            ></textarea>

            <div className="checkBox">
              <input
                type="checkbox"
                id="switch"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkBox__input"
              ></input>
              <label className="checkBox__label" htmlFor="switch">
                checkbox
              </label>
            </div>
          </section>

          <button className="newEntry__submitBtn" onClick={onTodoSubmitBtn}>
            Submit
          </button>
        </div>
      </CSSTransition>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./editStyle.scss";

export const EditTodo = ({ showEditTodo, setShowEditTodo, selectedItem }) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Оновлюємо стан після отримання selectedItem
  useEffect(() => {
    setNewTodoText(selectedItem?.title || "");
    setIsChecked(selectedItem?.completed || false);
  }, [selectedItem]);

  const dispatch = useDispatch();

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
  async function onTodoSubmitBtn() {
    if (newTodoText.trim() !== "") {
      setShowEditTodo((prevState) => !prevState);
      const newTodo = {
        userId: selectedItem.userId,
        id: selectedItem.id,
        title: newTodoText,
        completed: isChecked,
      };
      console.log(newTodo);
    }
  }

  return (
    <article>
      {showEditTodo ? (
        <div className="newEntry newEntry--show">
          <section className="newEntry__wrap">
            <div className="newEntry__userWrap">
              <img
                className="newEntry__userImg"
                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                alt="userIcon"
              />
              <p className="newEntry__userName">
                User №{selectedItem.userId} / todo №{selectedItem.id}
              </p>
            </div>
            <textarea
              className="newEntry__textarea"
              id="newText"
              value={newTodoText}
              onChange={onTextChange}
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
                Autoplay
              </label>
            </div>
          </section>

          <button className="newEntry__btn" onClick={onTodoSubmitBtn}>
            Submit
          </button>

          <div className="newEntry__cross-wrap" onClick={onShow}>
            <span className="newEntry__cross">✕</span>
          </div>
        </div>
      ) : null}
    </article>
  );
};

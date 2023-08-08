import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import "../editStyle.scss";

import { updatePost } from "../../../../ducks/postSlice";

export const PostEditForm = ({
  showEditPost,
  setShowEditPost,
  selectedItem,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();

  // Оновлюємо стан після отримання selectedItem
  useEffect(() => {
    setNewTitle(selectedItem?.title || "");
    setNewPost(selectedItem?.body || "");
  }, [selectedItem]);

  // показати/сховати модальне вікно з textarea
  function onShow() {
    setShowEditPost((prevState) => !prevState);
  }

  // записуєм в стейт текст нового TITLE
  function onTitleChange(event) {
    setNewTitle(event.target.value);
  }

  // записуєм в стейт текст нового BODY
  function onPostChange(event) {
    setNewPost(event.target.value);
  }

  // обробник подій для кнопки "submit"
  function onPostSubmitBtn() {
    if (newTitle.trim() !== "" && newPost.trim() !== "") {
      const updatedPost = {
        userId: selectedItem.userId,
        id: selectedItem.id,
        title: newTitle,
        body: newPost,
      };
      dispatch(updatePost({ postId: selectedItem.id, updatedPost }));
      setShowEditPost((prevState) => !prevState);
    }
  }

  return (
    <>
      {showEditPost ? (
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
                  User №{selectedItem.userId} / post №{selectedItem.id}
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

            <div className="newEntry__textBox">
              <textarea
                className="newEntry__titlearea"
                id="newText"
                value={newTitle}
                onChange={onTitleChange}
                autoFocus
              ></textarea>
            </div>

            <textarea
              className="newEntry__textarea"
              id="newText"
              value={newPost}
              onChange={onPostChange}
            ></textarea>
          </section>

          <button className="newEntry__submitBtn" onClick={onPostSubmitBtn}>
            Submit
          </button>
        </div>
      ) : null}
    </>
  );
};

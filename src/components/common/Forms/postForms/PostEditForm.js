import React, { useState, useEffect } from "react";
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

  // Оновлюємо стан після отримання selectedItem
  useEffect(() => {
    setNewTitle(selectedItem?.title || "");
    setNewPost(selectedItem?.body || "");
  }, [selectedItem]);

  const dispatch = useDispatch();

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
    <article>
      {showEditPost ? (
        <div className="newEntry newEntry--show">
          <section className="newEntry__wrap">
            <div className="newEntry__userWrap">
              <img
                className="newEntry__userImg"
                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                alt="userIcon"
              />
              <p className="newEntry__userName">
                User №{selectedItem.userId} / post №{selectedItem.id}
              </p>
            </div>
            <textarea
              className="newEntry__titlearea"
              id="newText"
              value={newTitle}
              onChange={onTitleChange}
              autoFocus
            ></textarea>

            <textarea
              className="newEntry__textarea"
              id="newText"
              value={newPost}
              onChange={onPostChange}
            ></textarea>
          </section>

          <button className="newEntry__btn" onClick={onPostSubmitBtn}>
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

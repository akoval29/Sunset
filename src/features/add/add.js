import React, { useState } from "react";
import "./addStyle.scss";

export const Add = ({ item }) => {
  const [showNewPost, setShowNewPost] = useState(false);

  function onShow() {
    setShowNewPost((prevState) => !prevState);
  }

  return (
    <article>
      {showNewPost ? (
        <div className="newEntry newEntry--show">
          <textarea
            className="newEntry__textarea"
            id="newText"
            placeholder={`Write new ${item}`}
          ></textarea>
          <button className="newEntry__btn" onClick={onShow}>
            Post
          </button>
          <div className="newEntry__cross-wrap" onClick={onShow}>
            <span className="newEntry__cross">✕</span>
          </div>
        </div>
      ) : (
        <div className="add" onClick={onShow}>
          <div className="add__cross-wrap">
            <span className="add__cross">✕</span>
          </div>
          <div className="add__message-wrap">
            <div className="add__message">Add new {item}</div>
          </div>
        </div>
      )}
    </article>
  );
};

import React, { useState } from "react";
import "./addStyle.css";

export const Add = ({ item }) => {
  const [showNewPost, setShowNewPost] = useState(false);

  function onShow() {
    setShowNewPost((prevState) => !prevState);
  }

  return (
    <div>
      {showNewPost ? (
        <div className="newEntry newEntry--show">
          <textarea
            className="newEntry__textarea"
            id="newText"
            placeholder={`Write new ${item}`}
          ></textarea>
          <button className="newEntry__btn" onClick={onShow}>
            Create
          </button>
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
    </div>
  );
};

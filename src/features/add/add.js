import React from "react";
import "./addStyle.css";

export const Add = ({ item }) => {
  const newPost = () => {
    console.log(`newPost btn +`);
  };

  return (
    <div className="add" onClick={newPost}>
      <div className="add__cross-wrap">
        <span className="add__cross">✕</span>
      </div>
      <div className="add__message-wrap">
        <div className="add__message">Add new {item}</div>
      </div>
    </div>
  );
};

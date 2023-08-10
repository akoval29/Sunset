import React from "react";
import "./errorStyle.scss";

export const ErrorMessage = () => {
  return (
    <div className="error">
      <img
        className="error__image"
        src="https://cdn-icons-png.flaticon.com/512/2766/2766474.png"
        alt="Помилка завантаження"
      />
      <p className="error__text">Помилка завантаження</p>
    </div>
  );
};

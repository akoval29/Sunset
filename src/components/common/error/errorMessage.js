import React from "react";
import "./errorStyle.scss";

export const ErrorMessage = () => {
  return (
    <div className="error">
      <img
        className="error__image"
        src="https://icon-library.com/images/image-error-icon/image-error-icon-17.jpg"
        alt="Помилка завантаження"
      />
      <p className="error__text">Помилка завантаження</p>
    </div>
  );
};

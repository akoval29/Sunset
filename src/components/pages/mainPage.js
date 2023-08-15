import React, { useState, useEffect } from "react";

import "../pages/user-page/userStyle.scss";

export const Main = () => {
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(
    localStorage.length === 0
  );

  useEffect(() => {
    setIsLocalStorageEmpty(localStorage.length === 0);
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setIsLocalStorageEmpty(true);
  };

  const buttonStyle = {
    width: "250px",
    height: "40px",
    margin: "0 auto",
  };

  return (
    <article className="app__main">
      <h3 className="app__main-title">Main</h3>
      <p className="app__paragraph">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quo
        voluptatum consequuntur laudantium expedita obcaecati, repellendus,
        maiores impedit ducimus tempora earum incidunt, a soluta omnis deserunt
        explicabo fugiat illo ipsam?
      </p>
      <button
        className="detailedUser__backBtn"
        onClick={handleClearLocalStorage}
        style={buttonStyle}
      >
        {isLocalStorageEmpty ? "Local Storage is clear" : "Clear Local Storage"}
      </button>
    </article>
  );
};

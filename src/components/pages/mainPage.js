import React, { useState, useEffect } from "react";
import "../../style/app.scss";

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

  const boldText = {
    fontWeight: "bold",
  };

  return (
    <article className="app__main">
      <h3 className="app__main-title">Main</h3>
      <ul className="app__list">
        <li className="app__list-item">
          This application is developed using{" "}
          <span style={boldText}>React Redux</span> technologies. Its core
          functionality revolves around interacting with the API at{" "}
          <a href="https://jsonplaceholder.typicode.com">
            https://jsonplaceholder.typicode.com
          </a>
          , from which we retrieve sample data including posts, todos, and
          users. The application fetches this data and stores it in the
          browser's <span style={boldText}>local storage</span>, serving as a
          data repository.
        </li>
        <li className="app__list-item">
          Subsequently, all interactions occur using this stored data. Users can
          create new posts, todos, as well as edit or delete them. It's
          important to note that this project is adaptable to various backend
          databases for handling real-world data.
        </li>
        <li className="app__list-item">
          When you click on any user within the Users section, you will gain
          access to detailed and comprehensive information about that specific
          user. This includes their associated posts and todos, employing{" "}
          <span style={boldText}>Nested Routing</span> for seamless navigation.
        </li>
        <li className="app__list-item">
          Additionally, an audio player is located in the right corner of the
          footer, enhancing the overall user experience while exploring the
          capabilities of this application.
        </li>
      </ul>

      <button
        className="app__clearBtn"
        onClick={handleClearLocalStorage}
        style={buttonStyle}
      >
        {isLocalStorageEmpty ? "Local Storage is clear" : "Clear Local Storage"}
      </button>
    </article>
  );
};

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

  return (
    <article className="app__main">
      <h3 className="app__main-title">Main</h3>
      <ul className="app__list">
        <li className="app__list-item">
          This application is developed using{" "}
          <span className="app__bold-text">React Redux</span> technologies. Its
          core functionality revolves around interacting with the API at{" "}
          <a href="https://jsonplaceholder.typicode.com">
            https://jsonplaceholder.typicode.com
          </a>
          . The application fetches sample data including{" "}
          <a href="https://jsonplaceholder.typicode.com/posts">posts</a>,{" "}
          <a href="https://jsonplaceholder.typicode.com/todos">todos</a>, and{" "}
          <a href="https://jsonplaceholder.typicode.com/users">users</a> from
          the API.
        </li>

        <li className="app__list-item">
          Obtained data is then stored in the browser's{" "}
          <span className="app__bold-text">local storage</span>, serving as a
          data repository. Subsequently, all interactions occur using this
          stored data. You can clear your browser's local storage by pressing
          the "Clear Local Storage" button below. If you see "local storage is
          clear" it means you didn't clicked on any section below Main section
          yet, so nothing to clear.
        </li>
        <li className="app__list-item">
          It's important to note that this project is adaptable to various
          backend databases for handling real-world data. In this app we use
          fake API database so every change you might do will be canceled after
          page reload. So You can create new posts, todos, as well as edit or
          delete them as you want.
        </li>
        <li className="app__list-item">
          When you click on any user within the Users section, you will gain
          access to detailed information about that specific user. This includes
          their associated posts, todos and albums.
        </li>
        <li className="app__list-item">
          Additionally, an audio player is located in the left corner of the
          footer, enhancing the overall user experience while exploring the
          capabilities of this application.
        </li>
      </ul>

      <button className="app__clearBtn" onClick={handleClearLocalStorage}>
        {isLocalStorageEmpty ? "Local Storage is clear" : "Clear Local Storage"}
      </button>
    </article>
  );
};

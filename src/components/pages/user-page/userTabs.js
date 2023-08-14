import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, allUsersSelector } from "../../../ducks/userSlice";

// commons
import { ErrorMessage } from "../../common/error/errorMessage";
import { Spinner } from "../../common/loading/spinner";

import "./userStyle.scss";

// import { testUser } from "./testUser";

export const UserTabs = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("tab_1");

  const allUsers = useSelector(allUsersSelector);
  const usersLoadingStatus = useSelector(
    (state) => state.users.usersLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails({ userId }));
  }, [dispatch, userId]);

  if (usersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (usersLoadingStatus === "error") {
    return <ErrorMessage message="Помилка завантаження детальних даних" />;
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // const currentUser = allUsers[userId];

  console.log(allUsers[Number(userId - 1)]);
  const currentUser = allUsers[Number(userId - 1)];

  return (
    <div className="userTabs">
      <section className="userTabs__nav">
        <button
          className={`userTabs__navBtn ${
            activeTab === "tab_1" ? "active" : ""
          }`}
          onClick={() => handleTabClick("tab_1")}
        >
          Posts
        </button>

        <button
          className={`userTabs__navBtn ${
            activeTab === "tab_2" ? "active" : ""
          }`}
          onClick={() => handleTabClick("tab_2")}
        >
          Todos
        </button>

        <button
          className={`userTabs__navBtn ${
            activeTab === "tab_3" ? "active" : ""
          }`}
          onClick={() => handleTabClick("tab_3")}
        >
          Albums
        </button>
      </section>

      <section className="userTabs__content">
        <div
          className={`userTabs__item ${activeTab === "tab_1" ? "active" : ""}`}
          id="tab_1"
        >
          {currentUser && currentUser.posts ? (
            <ul className="userTabs__list">
              {currentUser.posts.map((post) => (
                <li key={post.id} className="userTabs__post-item">
                  <div className="userTabs__post-title-wrap">
                    <h3 className="userTabs__post-title">{post.title}</h3>
                    <h1>ID №{post.id}</h1>
                  </div>
                  <div>{post.body}</div>
                </li>
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
        </div>

        <div
          className={`userTabs__item ${activeTab === "tab_2" ? "active" : ""}`}
          id="tab_2"
        >
          {currentUser && currentUser.todos ? (
            <ul className="userTabs__list">
              {currentUser.todos.map((todo) => (
                <li key={todo.id} className="userTabs__todo-item">
                  <div className="userTabs__todo-title-wrap">
                    <input
                      className="userTabs__todo-checkbox"
                      type="checkbox"
                      checked={todo.completed}
                      name="todo"
                      readOnly
                    />
                    <h3 className="userTabs__todo-title">{todo.title}</h3>
                  </div>
                  <h1>ID №{todo.id}</h1>
                </li>
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
        </div>

        <div
          className={`userTabs__item ${activeTab === "tab_3" ? "active" : ""}`}
          id="tab_3"
        >
          {currentUser && currentUser.albums ? (
            <ul className="userTabs__list">
              {currentUser.albums.map((album) => (
                <li key={album.id} className="userTabs__album-item">
                  <h3 className="userTabs__album-title">{album.title}</h3>
                  <h1>ID №{album.id}</h1>
                </li>
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </div>
  );
};

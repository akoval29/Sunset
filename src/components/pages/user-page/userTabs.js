import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, allUsersSelector } from "../../../ducks/userSlice";
import { ErrorMessage } from "../../common/error/errorMessage";
import { Spinner } from "../../common/loading/spinner";
import "./userStyle.scss";

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

  const renderContent = (content, renderItem) => {
    if (content) {
      return <ul className="userTabs__list">{content.map(renderItem)}</ul>;
    }
    return <Spinner />;
  };

  const renderPostItem = (post) => (
    <li key={post.id} className="userTabs__post-item">
      <div className="userTabs__post-title-wrap">
        <h3 className="userTabs__post-title">{post.title}</h3>
        <h1>ID №{post.id}</h1>
      </div>
      <div>{post.body}</div>
    </li>
  );

  const renderTodoItem = (todo) => (
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
  );

  const renderAlbumItem = (album) => (
    <li key={album.id} className="userTabs__album-item">
      <h3 className="userTabs__album-title">{album.title}</h3>
      <h1>ID №{album.id}</h1>
    </li>
  );

  const currentUser = allUsers[Number(userId - 1)];

  const tabData = [
    {
      id: "tab_1",
      label: "Posts",
      content: currentUser.posts,
      renderItem: renderPostItem,
    },
    {
      id: "tab_2",
      label: "Todos",
      content: currentUser.todos,
      renderItem: renderTodoItem,
    },
    {
      id: "tab_3",
      label: "Albums",
      content: currentUser.albums,
      renderItem: renderAlbumItem,
    },
  ];

  return (
    <div className="userTabs">
      <section className="userTabs__nav">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            className={`userTabs__navBtn ${
              activeTab === tab.id ? "active" : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="userTabs__content">
        {tabData.map((tab) => (
          <div
            key={tab.id}
            className={`userTabs__item ${activeTab === tab.id ? "active" : ""}`}
            id={tab.id}
          >
            {renderContent(tab.content, tab.renderItem)}
          </div>
        ))}
      </section>
    </div>
  );
};

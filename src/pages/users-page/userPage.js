import React from "react";
import { useFetchPosts } from "../../shared/hooks";

import "./userStyle.css";

export const Users = () => {
  const userItems = useFetchPosts("users");

  return (
    <article className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="user__container">
        <p className="user__userId">Name </p>
        <p className="user__userId">User name</p>
      </div>
      {userItems.map((item) => (
        <div className="user" key={item.id}>
          <div className="user__wrap">
            <p className="user__userId">
              {item.id}. {item.name}
            </p>
            <p className="user__userId">{item.username}</p>
          </div>
        </div>
      ))}
    </article>
  );
};

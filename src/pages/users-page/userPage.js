import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/useAPI";

import {
  usersFetching,
  usersFetched,
  usersFetchingError,
} from "../../redux/actions";

import "./userStyle.css";

export const Users = () => {
  const { users, usersLoadingStatus } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(usersFetching());
    request("https://jsonplaceholder.typicode.com/users")
      .then((data) => dispatch(usersFetched(data)))
      .catch(() => dispatch(usersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (usersLoadingStatus === "loading") {
    return <h5 className="">Loading ...</h5>;
  } else if (usersFetchingError === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

  return (
    <article className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="user__container">
        <p className="user__userId">Name </p>
        <p className="user__userId">User name</p>
      </div>
      {users.map((item) => (
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

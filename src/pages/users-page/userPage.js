import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/useAPI";

import { Spinner } from "../../features/loading/spinner";

import {
  usersFetching,
  usersFetched,
  usersFetchingError,
} from "../../redux/actions";

import "./userStyle.scss";

export const Users = () => {
  const { users, usersLoadingStatus } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    const fetchUsersData = async () => {
      dispatch(usersFetching());
      const data = await request("https://jsonplaceholder.typicode.com/users");
      dispatch(usersFetched(data));
    };
    fetchUsersData();
    // eslint-disable-next-line
  }, []);

  if (usersLoadingStatus === "loading") {
    return <Spinner />;
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
            <p className="user__userName">{item.username}</p>
          </div>
        </div>
      ))}
    </article>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../common/loading/spinner";

import { fetchUsers, allUsersSelector } from "../../../ducks/userSlice";

import "./userStyle.scss";

export const Users = () => {
  const allUsers = useSelector(allUsersSelector);
  const { usersLoadingStatus } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (usersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (usersLoadingStatus === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="user__container">
        <p className="user__userId">Name </p>
        <p className="user__userId">User name</p>
      </div>
      {allUsers.map((item) => (
        <li className="user" key={item.id}>
          <div className="user__wrap">
            <p className="user__userId">
              {item.id}. {item.name}
            </p>
            <p className="user__userName">{item.username}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

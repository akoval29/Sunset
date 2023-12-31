import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, allUsersSelector } from "../../../ducks/userSlice";

// commons
import { ErrorMessage } from "../../common/error/errorMessage";
import { Spinner } from "../../common/loading/spinner";

// style
import "./userStyle.scss";

export const Users = () => {
  const allUsers = useSelector(allUsersSelector);
  const usersLoadingStatus = useSelector(
    (state) => state.users.usersLoadingStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (usersLoadingStatus === "loading") {
    return (
      <article className="app__main">
        <Spinner />;
      </article>
    );
  } else if (usersLoadingStatus === "error") {
    return (
      <article className="app__main">
        <ErrorMessage message="Loading error" />;
      </article>
    );
  }

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="user__container">
        <p className="user__id">Name </p>
        <p className="user__id">User name</p>
      </div>

      {allUsers.map((item) => (
        <Link to={`/users/${item.id}`} key={item.id} className="user">
          <p className="user__name">
            {item.id}. {item.name}
          </p>
          <p className="user__userName">{item.username}</p>
        </Link>
      ))}
    </ul>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, allUsersSelector } from "../../../ducks/userSlice";

// commons
import { ErrorMessage } from "../../common/error/errorMessage";
import { Spinner } from "../../common/loading/spinner";

// style
import "../../../style/pageStyle.scss";

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
    return <Spinner />;
  } else if (usersLoadingStatus === "error") {
    return <ErrorMessage message="Помилка завантаження" />;
  }

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="page__userContainer">
        <p className="page__userId">Name </p>
        <p className="page__userId">User name</p>
      </div>

      {allUsers.map((item) => (
        <Link
          to={`/users/details/${item.id}`}
          key={item.id}
          className="page__link"
        >
          <li className="page">
            <div className="page__userWrap">
              <p className="page__userID">
                {item.id}. {item.name}
              </p>
              <p className="page__userName">{item.username}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

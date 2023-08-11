import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

import { ErrorMessage } from "../../common/error/errorMessage";

export const UserDetails = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.entities);

  const user = users[id];

  if (!user) {
    return <ErrorMessage message="Користувач відсутній" />;
  }

  return (
    <ul className="app__main">
      <h3 className="app__main-title">{user.name}</h3>
      <TransitionGroup>
        <CSSTransition
          key={user.id}
          timeout={300}
          classNames={{
            appear: "detailedUser-appear",
            appearActive: "detailedUser-appearActive",
            enter: "detailedUser-enter",
            enterActive: "detailedUser-enter-active",
            exit: "detailedUser-exit",
            exitActive: "detailedUser-exit-active",
          }}
          unmountOnExit
        >
          <div className="detailedUser">
            <div className="detailedUser__column">
              <li className="detailedUser__row">
                <img
                  className="detailedUser__icon"
                  src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png"
                  alt="img-email"
                />
                <div className="detailedUser__info">
                  <div className="detailedUser__info-item">{user.email}</div>
                  <div className="detailedUser__info-name">email</div>
                </div>
              </li>

              <span className="detailedUser__line"></span>

              <li className="detailedUser__row">
                <img
                  className="detailedUser__icon"
                  src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                  alt="img-email"
                />
                <div className="detailedUser__info">
                  <div className="detailedUser__info-item">{user.phone}</div>
                  <div className="detailedUser__info-name">mobile</div>
                </div>
              </li>

              <span className="detailedUser__line"></span>

              <li className="detailedUser__row">
                <img
                  className="detailedUser__icon"
                  src="https://img.freepik.com/free-icon/placeholder_318-903608.jpg"
                  alt="img-email"
                />
                <div className="detailedUser__info">
                  <div className="detailedUser__info-item">
                    {user.address.city}, {user.address.street},{" "}
                    {user.address.suite}
                  </div>
                  <div className="detailedUser__info-name">address</div>
                </div>
              </li>

              <span className="detailedUser__line"></span>

              <li className="detailedUser__row">
                <img
                  className="detailedUser__icon"
                  src="https://icon-library.com/images/icon-website/icon-website-0.jpg"
                  alt="img-email"
                />
                <div className="detailedUser__info">
                  <div className="detailedUser__info-item">{user.website}</div>
                  <div className="detailedUser__info-name">website</div>
                </div>
              </li>

              <span className="detailedUser__line"></span>

              <li className="detailedUser__row">
                <img
                  className="detailedUser__icon"
                  src="https://static.thenounproject.com/png/509354-200.png"
                  alt="img-email"
                />
                <div className="detailedUser__info">
                  <div className="detailedUser__info-item">
                    {user.company.name}
                  </div>
                  <div className="detailedUser__info-name">company</div>
                </div>
              </li>

              <span className="detailedUser__line"></span>

              <Link to="/users" className="detailedUser__backBtn">
                <img
                  className="detailedUser__backBtn-icon"
                  src="https://cdn-icons-png.flaticon.com/512/7168/7168657.png"
                  alt="img-goBack"
                />
                Back to Users
              </Link>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </ul>
  );
};

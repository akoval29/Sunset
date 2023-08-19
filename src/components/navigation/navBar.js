import React from "react";
import { NavLink } from "react-router-dom";

import "./navStyle.scss";

export const NavBar = () => {
  return (
    <ul className="nav">
      <h3 className="nav__title">Navigation</h3>

      <li className="nav__li">
        <NavLink className="nav__link" to="/">
          Main<span className="nav__span"></span>
        </NavLink>
      </li>

      <li className="nav__li">
        <NavLink className="nav__link" to="/posts">
          Posts<span className="nav__span"></span>
        </NavLink>
      </li>

      <li className="nav__li">
        <NavLink className="nav__link" to="/todos">
          Todos<span className="nav__span"></span>
        </NavLink>
      </li>

      <li className="nav__li">
        <NavLink className="nav__link" to="/users">
          Users<span className="nav__span"></span>
        </NavLink>
      </li>
    </ul>
  );
};

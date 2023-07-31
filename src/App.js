import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import { Main } from "./components/feature-pages/main-page/mainPage";
import { Posts } from "./components/feature-pages/posts-page/postPage";
import { Todos } from "./components/feature-pages/todos-page/todoPage";
import { Users } from "./components/feature-pages/users-page/userPage";
import { Player } from "./components/common/sound/player";
import defaultBg from "./lib/city.png";
import cyberBg from "./lib/cyber.png";
import "./style/app.scss";

export const App = () => {
  const [playing, setPlaying] = useState(false);

  const onPlay = (isPlaying) => {
    setPlaying(isPlaying);
  };

  const showClass = playing ? "app__bg--visible" : "app__bg--invisible";

  return (
    <Router>
      <article className="app">
        <img
          src={defaultBg}
          className={`app__bg ${!showClass}`}
          alt="default-bg"
        />
        <img src={cyberBg} className={`app__bg ${showClass}`} alt="cyber-bg" />
        <header className="app__header">New Company</header>
        <section className="app__container">
          <ul className="app__nav">
            <h3 className="app__nav-title">Navigation</h3>

            <li className="app__nav-li">
              <NavLink className="app__nav-link" to="/">
                Main<span className="app__span"></span>
              </NavLink>
            </li>

            <li className="app__nav-li">
              <NavLink className="app__nav-link" to="/posts">
                Posts<span className="app__span"></span>
              </NavLink>
            </li>

            <li className="app__nav-li">
              <NavLink className="app__nav-link" to="/todos">
                Todos<span className="app__span"></span>
              </NavLink>
            </li>

            <li className="app__nav-li">
              <NavLink className="app__nav-link" to="/users">
                Users<span className="app__span"></span>
              </NavLink>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </section>

        <footer className="app__footer">
          <Player playing={playing} onPlay={onPlay} />
          <div className="app__footer-linkwrap">
            <a href="https://www.facebook.com/">
              <img
                className="app__footer-icon"
                src="https://cdn-icons-png.flaticon.com/512/254/254390.png"
                alt="img-facebook"
              />
            </a>
            <a href="https://twitter.com/">
              <img
                className="app__footer-icon"
                src="https://cdn-icons-png.flaticon.com/512/25/25347.png"
                alt="img-twitter"
              />
            </a>
            <a href="https://www.youtube.com/">
              <img
                className="app__footer-icon"
                src="https://cdn-icons-png.flaticon.com/512/3938/3938035.png"
                alt="icon-youtube"
              />
            </a>
            <a href="https://www.instagram.com/">
              <img
                className="app__footer-icon"
                src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
                alt="icon-instagram"
              />
            </a>
          </div>
        </footer>
      </article>
    </Router>
  );
};

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import cityImage from "../../assets/city.png";

import { Main } from "../main-page/mainPage";
import { Posts } from "../posts-page/postPage";
import { Todos } from "../todos-page/todoPage";
import { Users } from "../users-page/userPage";

import "./app.scss";

export const App = () => {
  return (
    <Router>
      <article className="app">
        <img src={cityImage} className="app__bg" alt="bg" />
        <header className="app__header">Header</header>
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

          <aside className="app__links">
            <h3 className="app__links-title">Related links</h3>

            <a className="app__text-link" href="https://www.facebook.com/">
              facebook
            </a>
            <a className="app__text-link" href="https://twitter.com/">
              twitter
            </a>
            <a className="app__text-link" href="https://www.youtube.com/">
              youtube
            </a>
            <a className="app__text-link" href="https://www.instagram.com/">
              instagram
            </a>

            <a className="app__img-link" href="https://www.facebook.com/">
              <img
                className="app__link-icon"
                src="https://cdn-icons-png.flaticon.com/512/254/254390.png"
                alt="img-facebook"
              />
            </a>
            <a className="app__img-link" href="https://twitter.com/">
              <img
                className="app__link-icon"
                src="https://cdn-icons-png.flaticon.com/512/25/25347.png"
                alt="img-twitter"
              />
            </a>
            <a className="app__img-link" href="https://www.youtube.com/">
              <img
                className="app__link-icon"
                src="https://cdn-icons-png.flaticon.com/512/3938/3938035.png"
                alt="icon-youtube"
              />
            </a>
            <a className="app__img-link" href="https://www.instagram.com/">
              <img
                className="app__link-icon"
                src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
                alt="icon-instagram"
              />
            </a>
          </aside>
        </section>
        <footer className="app__footer">Footer</footer>
      </article>
    </Router>
  );
};

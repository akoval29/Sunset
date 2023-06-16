import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import cityImage from "../../img/city.png";

import { Main } from "../app-main/MainList";
import { Posts } from "../app-posts/PostList";
import { Todos } from "../app-todos/TodoList";
import { Users } from "../app-users/UserList";

import "./app.css";

export const App = () => {
  return (
    <Router>
      <article className="app">
        <img src={cityImage} className="app__bg" alt="bg" />
        <header className="app__header">Header</header>
        <section className="app__container">
          <nav className="app__nav">
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
              <NavLink className="app__nav-link" to="/users">
                Users<span className="app__span"></span>
              </NavLink>
            </li>

            <li className="app__nav-li">
              <NavLink className="app__nav-link" to="/todos">
                Todos<span className="app__span"></span>
              </NavLink>
            </li>
          </nav>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} />
          </Routes>

          <aside className="app__links">
            <h3 className="app__links-title">Related links</h3>
            <a className="app__link" href="https://www.facebook.com/">
              facebook
            </a>
            <a className="app__link" href="https://twitter.com/">
              twitter
            </a>
          </aside>
        </section>
        <footer className="app__footer">Footer</footer>
      </article>
    </Router>
  );
};

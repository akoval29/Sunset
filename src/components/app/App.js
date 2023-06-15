import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Main } from "../app-main/MainList";
import { Posts } from "../app-posts/PostList";
import { Todos } from "../app-todos/TodoList";
import { Users } from "../app-users/UserList";

import "./app.css";

export const App = () => {
  return (
    <Router>
      <article className="app">
        <header className="app__header">Header</header>
        <section className="app__container">
          <nav className="app__nav">
            <h3 className="app__nav-title">Navigation</h3>

            <li className="app__nav-li">
              <Link to="/">Main</Link>
            </li>
            <li className="app__nav-li">
              <Link to="/posts">Posts</Link>
            </li>
            <li className="app__nav-li">
              <Link to="/users">Users list</Link>
            </li>
            <li className="app__nav-li">
              <Link to="/todos">Todo list</Link>
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
          </aside>
        </section>
        <footer className="app__footer">Footer</footer>
      </article>
    </Router>
  );
};

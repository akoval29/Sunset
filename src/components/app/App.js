import { Posts } from "../app-posts/PostList";

import "./app.css";

export const App = () => {
  return (
    <article className="app">
      <header className="app__header">Header</header>
      <section className="app__container">
        <nav className="app__nav">
          <h3 className="app__nav-title">Navigation</h3>
          <li className="app__nav-li">Main</li>
          <li className="app__nav-li">Posts</li>
          <li className="app__nav-li">User List</li>
          <li className="app__nav-li">About us</li>
        </nav>

        {/* <article className="app__main">
          <h3 className="app__main-title">Main</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
            numquam temporibus! Exercitationem sit deserunt molestias numquam
            non ad nostrum reiciendis sunt nisi a doloremque aspernatur,
            provident et nesciunt. Pariatur, laboriosam!
          </p>
        </article> */}

        <Posts />

        <aside className="app__links">
          <h3 className="app__links-title">Related links</h3>
        </aside>
      </section>
      <footer className="app__footer">Footer</footer>
    </article>
  );
};

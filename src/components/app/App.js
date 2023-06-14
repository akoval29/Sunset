import "./app.css";

export const App = () => {
  return (
    <article className="app">
      <header className="app__header">Header</header>
      <section className="app__container">
        <nav className="app__nav">
          <h3 className="app__nav-title">Navigation</h3>
          <p className="app__nav-li">Main</p>
          <p className="app__nav-li">Posts</p>
          <p className="app__nav-li">User List</p>
          <p className="app__nav-li">About us</p>
        </nav>

        <article className="app__main">
          <h3 className="app__main-title">Main</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
            numquam temporibus! Exercitationem sit deserunt molestias numquam
            non ad nostrum reiciendis sunt nisi a doloremque aspernatur,
            provident et nesciunt. Pariatur, laboriosam!
          </p>
        </article>

        <aside className="app__links">
          <h3 className="app__links-title">Related links</h3>
        </aside>
      </section>
      <footer className="app__footer">Footer</footer>
    </article>
  );
};

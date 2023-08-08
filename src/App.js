import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "./components/pages/main-page/mainPage";
import { Posts } from "./components/pages/posts-page/postPage";
import { Todos } from "./components/pages/todos-page/todoPage";
import { Users } from "./components/pages/users-page/userPage";

import { NavBar } from "./components/navigation/navBar";
import { Footer } from "./components/footer/footer";

import defaultBg from "./lib/city.png";
import cyberBg from "./lib/cyber.png";
import "./style/app.scss";

export const App = () => {
  const [playing, setPlaying] = useState(false);

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
          <NavBar />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </section>

        <Footer playing={playing} setPlaying={setPlaying} />
      </article>
    </Router>
  );
};

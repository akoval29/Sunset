import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "./components/pages/mainPage";
import { Posts } from "./components/pages/postPage";
import { Todos } from "./components/pages/todoPage";
import { Users } from "./components/pages/user-page/userPage";
import { UserDetails } from "./components/pages/user-page/userDetails";

import { NavBar } from "./components/navigation/navBar";
import { Footer } from "./components/footer/footer";

import secondBg from "./lib/red-sunset.jpg";
import defaultBg from "./lib/cyber.png";

import "./style/app.scss";
import "./components/pages/user-page/userStyle.scss";

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
        <img src={secondBg} className={`app__bg ${showClass}`} alt="cyber-bg" />
        <header className="app__header">New Company</header>
        <section className="app__container">
          <NavBar />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </section>

        <Footer playing={playing} setPlaying={setPlaying} />
      </article>
    </Router>
  );
};

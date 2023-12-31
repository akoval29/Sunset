import React from "react";
import { Player } from "../common/sound/player";
import "./footerStyle.scss";

export const Footer = ({ playing, setPlaying }) => {
  // Player
  const onPlay = (isPlaying) => {
    setPlaying(isPlaying);
  };

  return (
    <footer className="footer">
      <Player playing={playing} onPlay={onPlay} />

      <div className="footer__linkwrap">
        <a href="https://www.facebook.com/">
          <img
            className="footer__icon"
            src="https://cdn-icons-png.flaticon.com/512/254/254390.png"
            alt="img-facebook"
          />
        </a>
        <a href="https://twitter.com/">
          <img
            className="footer__icon"
            src="https://cdn-icons-png.flaticon.com/512/25/25347.png"
            alt="img-twitter"
          />
        </a>
        <a href="https://www.youtube.com/">
          <img
            className="footer__icon"
            src="https://cdn-icons-png.flaticon.com/512/3938/3938035.png"
            alt="icon-youtube"
          />
        </a>
        <a href="https://www.instagram.com/">
          <img
            className="footer__icon"
            src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
            alt="icon-instagram"
          />
        </a>
      </div>
    </footer>
  );
};

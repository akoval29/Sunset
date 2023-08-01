import React, { useState, useEffect } from "react";

import "./playerStyle.scss";
import nomore from "../../../lib/OutsiderNoMore.mp3";

export const Player = ({ playing, onPlay }) => {
  const [audio] = useState(new Audio(nomore));
  const [volume, setVolume] = useState(0.4);

  const play = () => {
    audio.play();
    onPlay(true);
  };

  const pause = () => {
    audio.pause();
    onPlay(false);
  };

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
    onPlay(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    const handleAudioEnd = () => onPlay(false);
    audio.addEventListener("ended", handleAudioEnd);
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [audio, onPlay]);

  return (
    <div className="player">
      <div className="player__icon-wrap">
        {/* app__footer-icon - its a style from app.scss */}
        <img
          className="app__footer-icon"
          src="https://cdn-icons-png.flaticon.com/512/686/686463.png"
          alt="playBtn"
          onClick={play}
          disabled={playing}
        />

        <img
          className="app__footer-icon"
          src="https://cdn-icons-png.flaticon.com/512/64/64594.png"
          alt="pauseBtn"
          onClick={pause}
          disabled={!playing}
        />

        <img
          className="app__footer-icon"
          src="https://cdn-icons-png.flaticon.com/512/91/91265.png"
          alt="stopBtn"
          onClick={stop}
          disabled={!playing}
        />
      </div>

      {playing ? (
        <div className="player__volume-wrap">
          <input
            className="player__volume-input"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          {/* <span>{volume}</span> */}
        </div>
      ) : null}
    </div>
  );
};

// inspired by this video
// https://www.youtube.com/watch?v=lwYWMHVwYrs&ab_channel=SlowWalkthroughs%2FVideoGameAmbience

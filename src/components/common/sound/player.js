import React, { useState, useEffect } from "react";
import "./playerStyle.scss";

export const Player = ({ playing, onPlay }) => {
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.7);

  const playList = [
    "https://storage.cloud.google.com/sunset2023/%D0%94%D0%B8%D0%94%D1%8E%D0%9B%D1%8F%20-%20%D0%92%D0%B5%D1%82%D0%B5%D1%80.mp3",
    "https://storage.cloud.google.com/sunset2023/%D0%94%D0%B8%D0%94%D1%8E%D0%9B%D1%8F%20-%20%D0%A4%D0%BB%D0%B0%D0%BC%D0%B5%D0%BD%D0%BA%D0%BE.mp3",
    "https://storage.cloud.google.com/sunset2023/%D0%94%D0%B8%D0%B4%D1%8E%D0%BB%D1%8F%20-%20%D0%9D%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%93%D0%BE%D1%80%D0%BE%D0%B4.mp3",
    "https://storage.cloud.google.com/sunset2023/%D0%94%D0%B8%D0%B4%D1%8E%D0%BB%D1%8F%20-%20%D0%9F%D1%83%D1%82%D1%8C%20%D0%94%D0%BE%D0%BC%D0%BE%D0%B9.mp3",
    "https://storage.cloud.google.com/sunset2023/%D0%94%D0%B8%D0%B4%D1%8E%D0%BB%D1%8F%20-%20%D0%9B%D0%B5%D0%B4%D1%8F%D0%BD%D0%B0%D1%8F%20%D0%BB%D1%83%D0%BD%D0%B0.mp3",
  ];

  const play = (source) => {
    audio.src = source;
    audio.play();
    onPlay(true);
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playList.length);
    play(playList[randomIndex]);
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
    const handleAudioEnd = () => {
      stop();
    };
    audio.addEventListener("ended", handleAudioEnd);
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  return (
    <div className="player">
      <div className="player__icon-wrap">
        {playing ? (
          <img
            className="player__icon"
            src="https://cdn-icons-png.flaticon.com/512/91/91265.png"
            alt="stopBtn"
            onClick={stop}
          />
        ) : (
          <img
            className="player__icon"
            src="https://cdn-icons-png.flaticon.com/512/686/686463.png"
            alt="playBtn"
            onClick={playRandomSong}
          />
        )}
      </div>

      {playing && (
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
      )}
    </div>
  );
};

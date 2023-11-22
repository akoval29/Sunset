import React, { useState, useEffect } from "react";
import "./playerStyle.scss";

export const Player = ({ playing, onPlay }) => {
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.7);

  const playList = [
    "https://firebasestorage.googleapis.com/v0/b/sunset-d77d3.appspot.com/o/%D0%94%D0%B8%D0%94%D1%8E%D0%9B%D1%8F%20-%20%D0%92%D0%B5%D1%82%D0%B5%D1%80.mp3?alt=media&token=85c882bd-4756-4920-b275-f8a63d597742",
    "https://firebasestorage.googleapis.com/v0/b/sunset-d77d3.appspot.com/o/%D0%94%D0%B8%D0%94%D1%8E%D0%9B%D1%8F%20-%20%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4%20%D0%BD%D0%B0%20%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D1%83.mp3?alt=media&token=719dad24-c5fc-4361-bf72-36b6be5ce96e",
    "https://firebasestorage.googleapis.com/v0/b/sunset-d77d3.appspot.com/o/%D0%94%D0%B8%D0%B4%D1%8E%D0%BB%D1%8F%20-%20%D0%9F%D0%BE%D0%B5%D0%B4%D0%B8%D0%BD%D0%BE%D0%BA.mp3?alt=media&token=ca8d3d59-9bbc-45dd-ab72-70b742042d7a",
    "https://firebasestorage.googleapis.com/v0/b/sunset-d77d3.appspot.com/o/%D0%94%D0%B8%D0%B4%D1%8E%D0%BB%D1%8F%20-%20%D0%9F%D1%83%D1%82%D1%8C%20%D0%94%D0%BE%D0%BC%D0%BE%D0%B9.mp3?alt=media&token=6ac943ab-6368-4646-90ec-31cfc134461e",
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

import React, { useState } from "react";
import "./scrollStyle.scss";

export const ScrollTo = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    const container = document.querySelector(".app__main");
    const containerHeight = container.scrollHeight;
    setIsScrolled(!isScrolled);

    container.scrollTo({
      top: isScrolled ? 0 : containerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll" onClick={handleClick}>
      <span
        className={`scroll__arrow ${
          isScrolled ? "scroll__arrowUp" : "scroll__arrowDown"
        }`}
      ></span>
    </div>
  );
};

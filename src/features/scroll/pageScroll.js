import React, { useState } from "react";
import "./scrollStyle.css";

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

//  ------------------- HTML ВАРІАНТ -----------------------------
//  ---------------------- ВЕРСТКА -------------------------------
//  <div className="scroll" onClick={ScrollTo}>
//   <span className="scroll__arrow scroll__arrowDown"></span>
// </div>

// ------------------------  КОД  --------------------------------
// import "./scrollStyle.css";
// export const ScrollTo = () => {
//   // Навігація по скролу
//   const container = document.querySelector(".app__main");
//   const arrow = document.querySelector(".scroll__arrow");
//   let containerHeight = null;

//   if (arrow.classList.contains("scroll__arrowDown")) {
//     let containerHeight = container.scrollHeight;
//     arrow.classList.remove("scroll__arrowDown");
//     arrow.classList.add("scroll__arrowUp");
//   } else if (arrow.classList.contains("scroll__arrowUp")) {
//     containerHeight = 0;
//     arrow.classList.remove("scroll__arrowUp");
//     arrow.classList.add("scroll__arrowDown");
//   }

//   // Core
//   let currentTime = 0;
//   const start = container.scrollTop;
//   const change = containerHeight - start;
//   const duration = 1000;
//   const increment = 20;

//   function animateScroll() {
//     currentTime += increment;
//     container.scrollTop = easeInOutQuad(currentTime, start, change, duration);
//     if (currentTime < duration) {
//       setTimeout(animateScroll, increment);
//     }
//   }

//   const easeInOutQuad = (t, b, c, d) => {
//     t /= d / 2;
//     if (t < 1) return (c / 2) * t * t + b;
//     t--;
//     return (-c / 2) * (t * (t - 2) - 1) + b;
//   };
//   animateScroll();

// };

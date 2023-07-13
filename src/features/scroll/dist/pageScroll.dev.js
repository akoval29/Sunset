"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollTo = void 0;

require("./scrollStyle.css");

var ScrollTo = function ScrollTo() {
  // Навігація по скролу
  var container = document.querySelector(".app__main");
  var arrow = document.querySelector(".scroll__arrow");
  var containerHeight = container.scrollHeight;

  if (arrow.classList.contains("scroll__arrowDown")) {
    arrow.classList.remove("scroll__arrowDown");
    arrow.classList.add("scroll__arrowUp");
  } else if (arrow.classList.contains("scroll__arrowUp")) {
    containerHeight = 0;
    arrow.classList.remove("scroll__arrowUp");
    arrow.classList.add("scroll__arrowDown");
  } // Core


  var currentTime = 0;
  var start = container.scrollTop;
  var change = containerHeight - start;
  var duration = 1000;
  var increment = 20;

  function animateScroll() {
    currentTime += increment;
    container.scrollTop = easeInOutQuad(currentTime, start, change, duration);

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }

  var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  animateScroll();
};

exports.ScrollTo = ScrollTo;
export function scrollTo() {
  // Навігація по скролу
  const container = document.querySelector(".app__main");
  const arrow = document.querySelector(".scroll__arrow");
  let scrollValue = null;
  if (arrow.classList.contains("scroll__arrowDown")) {
    scrollValue = container.scrollHeight;
    arrow.classList.remove("scroll__arrowDown");
    arrow.classList.add("scroll__arrowUp");
  } else if (arrow.classList.contains("scroll__arrowUp")) {
    scrollValue = 0;
    arrow.classList.remove("scroll__arrowUp");
    arrow.classList.add("scroll__arrowDown");
  }

  // Core
  let currentTime = 0;
  const start = container.scrollTop;
  const change = scrollValue - start;
  const duration = 1000;
  const increment = 20;

  function animateScroll() {
    currentTime += increment;
    container.scrollTop = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  animateScroll();
}

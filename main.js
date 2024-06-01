const menuList = document.getElementById("menuList");
const icon = document.getElementById("icon");
const container = document.getElementsByName("section");
const info = document.getElementsByClassName("info");
// const footerContainer = document.getElementsByClassName("footer-container");

function toggleMenu() {
  menuList.classList.toggle("active-menu");
}

icon.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (icon.classList.contains("fa-sun")) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const trailCount = 15;
  const trails = Array.from({ length: trailCount }, () => {
    const trail = document.createElement("div");
    trail.classList.add("trail");
    document.body.appendChild(trail);
    return trail;
  });

  let mouseX = 0;
  let mouseY = 0;
  const mousePositions = Array(trailCount).fill({ x: 0, y: 0 });

  document.addEventListener(
    "mousemove",
    throttle((e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    }, 16)
  ); // Throttle to update every 16ms (approx 60 FPS)

  function animate() {
    mousePositions.pop();
    mousePositions.unshift({ x: mouseX, y: mouseY });

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    trails.forEach((trail, index) => {
      const { x, y } = mousePositions[index];
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.opacity = `${1 - index / trailCount}`; // Adjust opacity based on index
      trail.style.transform = `scale(${1 - index / trailCount})`; // Adjust size based on index
    });

    requestAnimationFrame(animate);
  }

  animate();
});

// Throttle function to limit the frequency of function calls
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".arrwor .next",
    prevEl: ".arrwor .prev",
  },
});

document.querySelector(".arrwor .prev").addEventListener("click", () => {
  swiper.slidePrev();
});

document.querySelector(".arrwor .next").addEventListener("click", () => {
  swiper.slideNext();
});

// Compare


// ScrollReveal
ScrollReveal({ reset: true, distance: "60px", duration: 2500, delay: 400 });

ScrollReveal().reveal("section", { delay: 100 });
// ScrollReveal().reveal(".footer-container", { delay: 200 });
ScrollReveal().reveal(".info", { delay: 200 });

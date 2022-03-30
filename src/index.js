const $spinner = document.getElementById("spinner");
let from = null,
  to = null,
  turn = 0,
  velocity = 0;

document.addEventListener("touchstart", (e) => {
  setFrom(e.touches[0].clientX, e.touches[0].clientY);
});

document.addEventListener("touchmove", (e) => {
  setTo(e.touches[0].clientX, e.touches[0].clientY);
});

document.addEventListener("touchend", (e) => {
  if (from) leave();
});

document.addEventListener("mousedown", (e) => {
  setFrom(e.clientX, e.clientY);
});

document.addEventListener("mouseup", (e) => {
  setTo(e.clientX, e.clientY);
  if (from) leave();
});

const setFrom = (x, y) => {
  from = { x, y };
};

const setTo = (x, y) => {
  to = { x, y };
};

const leave = () => {
  const w = window.innerWidth,
    h = window.innerHeight;
  const z = (to.x - from.x) * (h / 2 - to.y) - (to.y - from.y) * (w / 2 - to.x);
  const dist = Math.hypot((to.y - from.y), (to.x - from.x));

  velocity += Math.sign(z) * ((dist / Math.hypot(w, h)) * 0.125);
  from = null;
  to = null;
};

const tick = () => {
  velocity += -velocity * 0.025;

  turn += velocity;

  $spinner.style.transform = `rotateZ(${turn}turn)`;
  window.requestAnimationFrame(tick);
};
tick();

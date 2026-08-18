(function () {
  const COLORS = [
    "#C8400A", // orange
    "#242017", // dark brown / black
    "#2c5544", // green
    "#ed6551", // coral
    "#efd06f"  // yellow
  ];

  const TRANSITION_DURATION = 12000;
  const HOLD_DURATION = 8000;
  const UPDATE_EVERY = 260;

  const FAVICON_SIZE = 128;
  const CIRCLE_RADIUS = 54;

  let favicon = document.querySelector("link[data-dynamic-favicon='true']");

  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.setAttribute("data-dynamic-favicon", "true");
    document.head.appendChild(favicon);
  }

  const canvas = document.createElement("canvas");
  canvas.width = FAVICON_SIZE;
  canvas.height = FAVICON_SIZE;

  const ctx = canvas.getContext("2d");

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");

    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16)
    };
  }

  function smootherStep(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function mixColor(colorA, colorB, amount) {
    const t = smootherStep(amount);
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);

    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);

    return `rgb(${r}, ${g}, ${bl})`;
  }

  function drawFavicon(color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(
      FAVICON_SIZE / 2,
      FAVICON_SIZE / 2,
      CIRCLE_RADIUS,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = color;
    ctx.fill();

    favicon.href = canvas.toDataURL("image/png");
  }

  let colorIndex = 0;
  let phase = "hold";
  let phaseStart = performance.now();
  let lastDraw = 0;

  function update(now) {
    requestAnimationFrame(update);

    if (document.visibilityState !== "visible") {
      return;
    }

    if (now - lastDraw < UPDATE_EVERY) {
      return;
    }

    lastDraw = now;

    const elapsed = now - phaseStart;
    const currentColor = COLORS[colorIndex];
    const nextColor = COLORS[(colorIndex + 1) % COLORS.length];

    if (phase === "hold") {
      drawFavicon(currentColor);

      if (elapsed >= HOLD_DURATION) {
        phase = "transition";
        phaseStart = now;
      }

      return;
    }

    const amount = Math.min(elapsed / TRANSITION_DURATION, 1);
    const mixed = mixColor(currentColor, nextColor, amount);

    drawFavicon(mixed);

    if (amount >= 1) {
      colorIndex = (colorIndex + 1) % COLORS.length;
      phase = "hold";
      phaseStart = now;
    }
  }

  drawFavicon(COLORS[0]);
  requestAnimationFrame(update);
})();

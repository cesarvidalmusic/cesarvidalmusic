(function () {
  const COLORS = [
    "#242017", // dark brown / black
    "#2c5544", // green
    "#ed6551", // coral
    "#efd06f"  // yellow
  ];

  const TRANSITION_DURATION = 1000; // 1 segundo cambiando de color
  const HOLD_DURATION = 1000;       // 1 segundo quieto en cada color
  const UPDATE_INTERVAL = 80;       // suavidad del cambio

  let favicon = document.querySelector("link[rel='icon']");

  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }

  favicon.type = "image/png";

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16)
    };
  }

  function mixColor(colorA, colorB, amount) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);

    const r = Math.round(a.r + (b.r - a.r) * amount);
    const g = Math.round(a.g + (b.g - a.g) * amount);
    const bl = Math.round(a.b + (b.b - a.b) * amount);

    return `rgb(${r}, ${g}, ${bl})`;
  }

  function drawFavicon(color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(32, 32, 25, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    favicon.href = canvas.toDataURL("image/png");
  }

  let colorIndex = 0;
  let phase = "hold";
  let phaseStart = Date.now();

  function update() {
    const now = Date.now();
    const elapsed = now - phaseStart;

    const currentColor = COLORS[colorIndex];
    const nextColor = COLORS[(colorIndex + 1) % COLORS.length];

    if (phase === "hold") {
      drawFavicon(currentColor);

      if (elapsed >= HOLD_DURATION) {
        phase = "transition";
        phaseStart = now;
      }
    } else {
      const amount = Math.min(elapsed / TRANSITION_DURATION, 1);
      const mixed = mixColor(currentColor, nextColor, amount);

      drawFavicon(mixed);

      if (amount >= 1) {
        colorIndex = (colorIndex + 1) % COLORS.length;
        phase = "hold";
        phaseStart = now;
      }
    }
  }

  drawFavicon(COLORS[0]);
  setInterval(update, UPDATE_INTERVAL);
})();

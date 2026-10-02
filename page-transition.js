(function () {
  const BAR_COUNT = 5;
  const MIN_DURATION = 2100;
  const MAX_DURATION = 3000;
  const MAX_DELAY = 260;

  let isNavigating = false;

  function injectStyles() {
    if (document.getElementById("cv-teeth-transition-styles")) return;

    const style = document.createElement("style");
    style.id = "cv-teeth-transition-styles";

    style.textContent = `
      .cv-teeth-destination {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        border: 0;
        z-index: 2147483000;
        pointer-events: none;
        background: #ffffff;
      }

      .cv-teeth-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483600;
        pointer-events: none;
        overflow: hidden;
        background: transparent;
      }

      .cv-teeth-bar {
        position: absolute;
        top: 0;
        height: 100vh;
        background-repeat: no-repeat;
        background-position-y: 0;
        transform: translateY(0);
        will-change: transform;
      }

      .cv-transition-freeze {
        cursor: progress;
      }
    `;

    document.head.appendChild(style);
  }

  function isInternalLink(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.hasAttribute("download")) return false;
    if (link.closest(".cv-nav-soon")) return false;

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) return false;
    if (url.href === window.location.href) return false;
    if (url.hash && url.pathname === window.location.pathname) return false;

    return true;
  }

  function waitForIframeLoad(iframe) {
    return new Promise(resolve => {
      let resolved = false;

      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };

      iframe.addEventListener("load", done, { once: true });

      setTimeout(done, 1400);
    });
  }

  function normalizeCanvasToViewport(sourceCanvas) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const normalizedCanvas = document.createElement("canvas");
    normalizedCanvas.width = viewportWidth;
    normalizedCanvas.height = viewportHeight;

    const ctx = normalizedCanvas.getContext("2d");

    const sourceWidth = sourceCanvas.width;
    const sourceHeight = sourceCanvas.height;

    const scale = Math.max(
      viewportWidth / sourceWidth,
      viewportHeight / sourceHeight
    );

    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;

    const drawX = (viewportWidth - drawWidth) / 2;
    const drawY = (viewportHeight - drawHeight) / 2;

    ctx.drawImage(
      sourceCanvas,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );

    return normalizedCanvas;
  }

  async function captureCurrentPage() {
    if (!window.html2canvas) {
      console.warn("html2canvas no está cargado. Usando fallback simple.");
      return null;
    }

    const target = document.querySelector(".cv-page") || document.body;

    const canvas = await window.html2canvas(target, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: 1,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0
    });

    const normalizedCanvas = normalizeCanvasToViewport(canvas);

    return normalizedCanvas.toDataURL("image/jpeg", 0.88);
  }

  function directionForIndex(index) {
    const pattern = [-1, 1, -1, 1, -1];
    return pattern[index % pattern.length];
  }

  function createBars(snapshotDataUrl) {
    const overlay = document.createElement("div");
    overlay.className = "cv-teeth-overlay";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const barWidth = Math.ceil(viewportWidth / BAR_COUNT);

    const fallbackColor = getComputedStyle(document.body).backgroundColor || "#ffffff";

    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement("div");
      const left = i * barWidth;

      const actualWidth = i === BAR_COUNT - 1
        ? viewportWidth - left
        : barWidth + 1;

      bar.className = "cv-teeth-bar";
      bar.style.left = left + "px";
      bar.style.width = actualWidth + "px";

      if (snapshotDataUrl) {
        bar.style.backgroundImage = `url("${snapshotDataUrl}")`;
        bar.style.backgroundSize = `${viewportWidth}px ${viewportHeight}px`;
        bar.style.backgroundPositionX = `-${left}px`;
      } else {
        bar.style.background = fallbackColor;
      }

      overlay.appendChild(bar);
    }

    document.body.appendChild(overlay);

    return overlay;
  }

  function createDestinationFrame(destinationUrl) {
    const iframe = document.createElement("iframe");

    iframe.className = "cv-teeth-destination";
    iframe.src = destinationUrl;

    document.body.appendChild(iframe);

    return iframe;
  }

  function animateBarsOpen(overlay) {
    const bars = Array.from(overlay.querySelectorAll(".cv-teeth-bar"));

    requestAnimationFrame(() => {
      bars.forEach((bar, index) => {
        const direction = directionForIndex(index);
        const travel = direction < 0 ? "-112vh" : "112vh";

        const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
        const delay = Math.random() * MAX_DELAY;

        bar.style.transition = `
          transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms
        `;

        bar.style.transform = `translateY(${travel})`;
      });
    });

    return MAX_DURATION + MAX_DELAY + 180;
  }

  async function goToWithTeethTransition(destinationUrl) {
    if (isNavigating) return;

    isNavigating = true;
    document.documentElement.classList.add("cv-transition-freeze");

    injectStyles();

    let snapshotDataUrl = null;

    try {
      snapshotDataUrl = await captureCurrentPage();
    } catch (error) {
      console.warn("No se pudo capturar la página actual:", error);
    }

    const overlay = createBars(snapshotDataUrl);
    const iframe = createDestinationFrame(destinationUrl);

    await waitForIframeLoad(iframe);

    const totalTime = animateBarsOpen(overlay);

    setTimeout(() => {
      window.location.href = destinationUrl;
    }, totalTime);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();

    document.addEventListener("click", event => {
      const link = event.target.closest("a");

      if (!isInternalLink(link)) return;

      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      goToWithTeethTransition(link.href);
    });
  });
})();

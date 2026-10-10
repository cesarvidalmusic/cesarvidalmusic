(function () {
  const BAR_COUNT = 5;
  const MIN_DURATION = 2500;
  const MAX_DURATION = 3600;
  const MAX_DELAY = 320;

  const SNAPSHOT_KEY = "cv-teeth-transition-snapshot-v6";
  const SNAPSHOT_TIME_KEY = "cv-teeth-transition-time-v6";
  const SNAPSHOT_MAX_AGE = 7000;

  let isNavigating = false;

  function injectStyles() {
    if (document.getElementById("cv-teeth-transition-styles")) return;

    const style = document.createElement("style");
    style.id = "cv-teeth-transition-styles";

    style.textContent = `
      .cv-teeth-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483600;
        pointer-events: auto;
        overflow: hidden;
        background: transparent;
      }

      .cv-teeth-bar {
        position: absolute;
        top: 0;
        height: 100vh;
        overflow: hidden;
        transform: translateY(0);
        will-change: transform;
        background-repeat: no-repeat;
        background-position-y: 0;
        background-color: #ffffff;
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
      foreignObjectRendering: false,
      scale: 1,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      imageTimeout: 2200
    });

    return canvas.toDataURL("image/jpeg", 0.82);
  }

  function saveSnapshot(snapshotDataUrl) {
    if (!snapshotDataUrl) return;

    try {
      sessionStorage.setItem(SNAPSHOT_KEY, snapshotDataUrl);
      sessionStorage.setItem(SNAPSHOT_TIME_KEY, String(Date.now()));
    } catch (error) {
      console.warn("No se pudo guardar la captura para la transición:", error);
      sessionStorage.removeItem(SNAPSHOT_KEY);
      sessionStorage.removeItem(SNAPSHOT_TIME_KEY);
    }
  }

  function readSnapshot() {
    const snapshotDataUrl = sessionStorage.getItem(SNAPSHOT_KEY);
    const timeRaw = sessionStorage.getItem(SNAPSHOT_TIME_KEY);

    sessionStorage.removeItem(SNAPSHOT_KEY);
    sessionStorage.removeItem(SNAPSHOT_TIME_KEY);

    if (!snapshotDataUrl || !timeRaw) return null;

    const age = Date.now() - Number(timeRaw);

    if (!Number.isFinite(age) || age > SNAPSHOT_MAX_AGE) {
      return null;
    }

    return snapshotDataUrl;
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
      bar.style.backgroundColor = fallbackColor;

      if (snapshotDataUrl) {
        bar.style.backgroundImage = `url("${snapshotDataUrl}")`;
        bar.style.backgroundSize = `${viewportWidth}px ${viewportHeight}px`;
        bar.style.backgroundPositionX = `-${left}px`;
      }

      overlay.appendChild(bar);
    }

    document.body.appendChild(overlay);

    return overlay;
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

    window.setTimeout(() => {
      overlay.remove();
    }, MAX_DURATION + MAX_DELAY + 220);
  }

  async function goToWithTeethTransition(destinationUrl) {
    if (isNavigating) return;

    isNavigating = true;
    document.documentElement.classList.add("cv-transition-freeze");

    let snapshotDataUrl = null;

    try {
      snapshotDataUrl = await captureCurrentPage();
    } catch (error) {
      console.warn("No se pudo capturar la página actual:", error);
    }

    saveSnapshot(snapshotDataUrl);

    window.location.href = destinationUrl;
  }

  function setupOutgoingLinks() {
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
  }

  function setupIncomingTransition() {
    const snapshotDataUrl = readSnapshot();

    if (!snapshotDataUrl) return;

    const overlay = createBars(snapshotDataUrl);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animateBarsOpen(overlay);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    setupOutgoingLinks();
    setupIncomingTransition();
  });
})();

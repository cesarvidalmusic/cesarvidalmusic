(function () {
  const STORAGE_KEY = "cv-teeth-transition-snapshot";
  const META_KEY = "cv-teeth-transition-meta";

  const BAR_COUNT = 13;
  const MIN_DURATION = 680;
  const MAX_DURATION = 980;
  const MAX_DELAY = 95;

  let isNavigating = false;

  function isInternalLink(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.hasAttribute("download")) return false;
    if (link.closest(".cv-nav-soon")) return false;

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) return false;
    if (url.hash && url.pathname === window.location.pathname) return false;
    if (url.href === window.location.href) return false;

    return true;
  }

  function injectTransitionStyles() {
    if (document.getElementById("cv-teeth-transition-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "cv-teeth-transition-styles";

    style.textContent = `
      .cv-teeth-transition {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        pointer-events: none;
        overflow: hidden;
        background: transparent;
      }

      .cv-teeth-transition__bar {
        position: absolute;
        top: 0;
        height: 100vh;
        background-repeat: no-repeat;
        background-position-y: 0;
        will-change: transform;
        transform: translateY(0);
      }

      .cv-transition-freeze {
        cursor: progress;
      }
    `;

    document.head.appendChild(style);
  }

  function getSnapshotTarget() {
    return document.querySelector(".cv-page") || document.body;
  }

  async function captureCurrentPage() {
    if (!window.html2canvas) {
      throw new Error("html2canvas is not loaded.");
    }

    const target = getSnapshotTarget();

    const canvas = await window.html2canvas(target, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: Math.min(window.devicePixelRatio || 1, 1.5),
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollX: 0,
      scrollY: 0
    });

    return canvas.toDataURL("image/jpeg", 0.86);
  }

  function saveSnapshot(dataUrl) {
    const meta = {
      width: window.innerWidth,
      height: window.innerHeight,
      time: Date.now()
    };

    try {
      sessionStorage.setItem(STORAGE_KEY, dataUrl);
      sessionStorage.setItem(META_KEY, JSON.stringify(meta));
    } catch (error) {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(META_KEY);
    }
  }

  function readSnapshot() {
    const dataUrl = sessionStorage.getItem(STORAGE_KEY);
    const metaRaw = sessionStorage.getItem(META_KEY);

    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(META_KEY);

    if (!dataUrl || !metaRaw) {
      return null;
    }

    try {
      return {
        dataUrl,
        meta: JSON.parse(metaRaw)
      };
    } catch (error) {
      return null;
    }
  }

  function directionForIndex(index) {
    const pattern = [
      -1, 1, -1, 1, -1, 1, 1,
      -1, 1, -1, 1, -1, 1
    ];

    return pattern[index % pattern.length];
  }

  function createBars(snapshot) {
    injectTransitionStyles();

    const overlay = document.createElement("div");
    overlay.className = "cv-teeth-transition";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const barWidth = Math.ceil(viewportWidth / BAR_COUNT);

    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement("div");
      const left = i * barWidth;
      const actualWidth = i === BAR_COUNT - 1
        ? viewportWidth - left
        : barWidth + 1;

      bar.className = "cv-teeth-transition__bar";

      bar.style.left = left + "px";
      bar.style.width = actualWidth + "px";
      bar.style.backgroundImage = `url("${snapshot.dataUrl}")`;
      bar.style.backgroundSize = `${viewportWidth}px ${viewportHeight}px`;
      bar.style.backgroundPositionX = `-${left}px`;

      overlay.appendChild(bar);
    }

    document.body.appendChild(overlay);

    return overlay;
  }

  function revealNewPageWithBars(snapshot) {
    const overlay = createBars(snapshot);
    const bars = Array.from(
      overlay.querySelectorAll(".cv-teeth-transition__bar")
    );

    requestAnimationFrame(() => {
      bars.forEach((bar, index) => {
        const direction = directionForIndex(index);
        const travel = direction < 0 ? "-112vh" : "112vh";

        const randomDuration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
        const randomDelay = Math.random() * MAX_DELAY;

        bar.style.transition = `
          transform ${randomDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${randomDelay}ms
        `;

        bar.style.transform = `translateY(${travel})`;
      });
    });

    window.setTimeout(() => {
      overlay.remove();
    }, MAX_DURATION + MAX_DELAY + 180);
  }

  async function goToWithTransition(url) {
    if (isNavigating) return;

    isNavigating = true;
    document.documentElement.classList.add("cv-transition-freeze");

    try {
      const snapshot = await captureCurrentPage();
      saveSnapshot(snapshot);
    } catch (error) {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(META_KEY);
    }

    window.location.href = url;
  }

  function setupOutgoingLinks() {
    document.addEventListener("click", event => {
      const link = event.target.closest("a");

      if (!isInternalLink(link)) {
        return;
      }

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

      goToWithTransition(link.href);
    });
  }

  function setupIncomingTransition() {
    const snapshot = readSnapshot();

    if (!snapshot) {
      return;
    }

    window.addEventListener("load", () => {
      window.setTimeout(() => {
        revealNewPageWithBars(snapshot);
      }, 80);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectTransitionStyles();
    setupOutgoingLinks();
    setupIncomingTransition();
  });
})();

(function () {
  const TRANSITION_VERSION = "v7-soft-color-wash";

  const PAGE_COLORS = {
    "bio.html": {
      base: "rgba(255,255,255,0.94)",
      wash: "rgba(36,32,23,0.68)",
      accent: "rgba(36,32,23,0.28)"
    },
    "gonzalez-reeds.html": {
      base: "rgba(255,255,255,0.94)",
      wash: "rgba(200,64,10,0.72)",
      accent: "rgba(200,64,10,0.32)"
    }
  };

  const STORAGE_KEY = "cv-soft-page-transition";
  const OUT_DURATION = 620;
  const IN_DURATION = 950;

  let isNavigating = false;

  function getPageName(urlString) {
    const url = new URL(urlString, window.location.href);
    const parts = url.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function getConfigForUrl(urlString) {
    const pageName = getPageName(urlString);
    return PAGE_COLORS[pageName] || null;
  }

  function injectStyles() {
    if (document.getElementById("cv-soft-transition-styles")) return;

    const style = document.createElement("style");
    style.id = "cv-soft-transition-styles";

    style.textContent = `
      .cv-soft-transition-layer {
        position: fixed;
        inset: 0;
        z-index: 2147483600;
        pointer-events: none;
        opacity: 0;
        transition:
          opacity var(--cv-soft-duration, 720ms) cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .cv-soft-transition-layer::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 74% 18%, var(--cv-soft-accent), transparent 36%),
          linear-gradient(135deg, var(--cv-soft-base) 0%, var(--cv-soft-wash) 100%);
      }

      .cv-soft-transition-layer.is-visible {
        opacity: 1;
      }

      .cv-soft-blur-out .cv-page {
        filter: blur(8px) brightness(0.92);
        transform: scale(1.012);
        transition:
          filter 620ms cubic-bezier(0.16, 1, 0.3, 1),
          transform 620ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .cv-soft-blur-in .cv-page {
        filter: blur(8px) brightness(0.94);
        transform: scale(1.012);
      }

      .cv-soft-blur-in.cv-soft-ready .cv-page {
        filter: blur(0) brightness(1);
        transform: scale(1);
        transition:
          filter 950ms cubic-bezier(0.16, 1, 0.3, 1),
          transform 950ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .cv-soft-transition-freeze {
        cursor: progress;
      }
    `;

    document.head.appendChild(style);
  }

  function createLayer(config, duration) {
    const layer = document.createElement("div");

    layer.className = "cv-soft-transition-layer";
    layer.style.setProperty("--cv-soft-duration", duration + "ms");
    layer.style.setProperty("--cv-soft-base", config.base);
    layer.style.setProperty("--cv-soft-wash", config.wash);
    layer.style.setProperty("--cv-soft-accent", config.accent);

    document.body.appendChild(layer);

    return layer;
  }

  function isInternalTransitionLink(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.hasAttribute("download")) return false;
    if (link.closest(".cv-nav-soon")) return false;

    const destination = new URL(link.href, window.location.href);

    if (destination.origin !== window.location.origin) return false;
    if (destination.href === window.location.href) return false;
    if (destination.hash && destination.pathname === window.location.pathname) return false;

    const currentConfig = getConfigForUrl(window.location.href);
    const destinationConfig = getConfigForUrl(destination.href);

    if (!currentConfig || !destinationConfig) return false;

    return true;
  }

  function saveIncomingConfig(destinationUrl) {
    const config = getConfigForUrl(destinationUrl);

    if (!config) return;

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: TRANSITION_VERSION,
          time: Date.now(),
          config
        })
      );
    } catch (error) {
      console.warn("No se pudo guardar la transición:", error);
    }
  }

  function readIncomingConfig() {
    let raw = null;

    try {
      raw = sessionStorage.getItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }

    if (!raw) return null;

    try {
      const data = JSON.parse(raw);

      if (data.version !== TRANSITION_VERSION) return null;
      if (!data.time || Date.now() - data.time > 7000) return null;
      if (!data.config) return null;

      return data.config;
    } catch (error) {
      return null;
    }
  }

  function runOutgoingTransition(destinationUrl) {
    if (isNavigating) return;

    const destinationConfig = getConfigForUrl(destinationUrl);

    if (!destinationConfig) {
      window.location.href = destinationUrl;
      return;
    }

    isNavigating = true;

    injectStyles();
    saveIncomingConfig(destinationUrl);

    document.documentElement.classList.add("cv-soft-transition-freeze");
    document.documentElement.classList.add("cv-soft-blur-out");

    const layer = createLayer(destinationConfig, OUT_DURATION);

    requestAnimationFrame(() => {
      layer.classList.add("is-visible");
    });

    window.setTimeout(() => {
      window.location.href = destinationUrl;
    }, OUT_DURATION);
  }

  function setupOutgoingLinks() {
    document.addEventListener("click", event => {
      const link = event.target.closest("a");

      if (!isInternalTransitionLink(link)) return;

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
      runOutgoingTransition(link.href);
    });
  }

  function setupIncomingTransition() {
    const config = readIncomingConfig();

    if (!config) return;

    injectStyles();

    document.documentElement.classList.add("cv-soft-blur-in");

    const layer = createLayer(config, IN_DURATION);
    layer.classList.add("is-visible");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add("cv-soft-ready");
        layer.classList.remove("is-visible");
      });
    });

    window.setTimeout(() => {
      layer.remove();
      document.documentElement.classList.remove("cv-soft-blur-in");
      document.documentElement.classList.remove("cv-soft-ready");
    }, IN_DURATION + 120);
  }

  function init() {
    injectStyles();
    setupOutgoingLinks();
    setupIncomingTransition();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

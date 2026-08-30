(function () {
  const TRANSITION_DURATION = 720;
  const STORAGE_KEY = "cv-page-transition";

  function createTransitionLayer() {
    const existing = document.querySelector(".cv-page-transition");

    if (existing) {
      return existing;
    }

    const layer = document.createElement("div");
    layer.className = "cv-page-transition";

    const curtain = document.createElement("div");
    curtain.className = "cv-page-transition__curtain";

    layer.appendChild(curtain);
    document.body.appendChild(layer);

    return layer;
  }

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

  function runEnterTransition() {
    const shouldAnimate = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (!shouldAnimate) {
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);

    const layer = createTransitionLayer();

    layer.classList.add("is-ready");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        layer.classList.add("is-entering");
        layer.classList.remove("is-ready");
      });
    });

    window.setTimeout(() => {
      layer.remove();
    }, TRANSITION_DURATION + 120);
  }

  function runExitTransition(destination) {
    const layer = createTransitionLayer();

    layer.classList.remove("is-entering");
    layer.classList.remove("is-ready");

    requestAnimationFrame(() => {
      layer.classList.add("is-closing");
    });

    window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      window.location.href = destination;
    }, TRANSITION_DURATION);
  }

  document.addEventListener("DOMContentLoaded", () => {
    runEnterTransition();

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

      runExitTransition(link.href);
    });
  });
})();

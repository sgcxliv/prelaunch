(function () {
  const cfg = window.PARTY_SITE_CONFIG || {};
  const cities = Array.isArray(cfg.cities) ? cfg.cities.filter(Boolean) : [];
  const intervalMs =
    typeof cfg.cityRotateIntervalMs === 'number' && cfg.cityRotateIntervalMs > 0
      ? cfg.cityRotateIntervalMs
      : 4500;

  const nodes = document.querySelectorAll('[data-city-rotatable]');
  if (!nodes.length) return;

  let index = 0;
  const fadeMs = 420;
  let timer = null;

  function setText(name) {
    nodes.forEach((el) => {
      el.textContent = name;
    });
  }

  function applyStatic(name) {
    clearInterval(timer);
    timer = null;
    setText(name);
    nodes.forEach((el) => {
      el.classList.add('city-text--static');
      el.removeAttribute('aria-live');
    });
  }

  function fadeOutThenSwap() {
    nodes.forEach((el) => {
      el.classList.add('city-text--fade-out');
    });
    window.setTimeout(() => {
      index = (index + 1) % cities.length;
      setText(cities[index]);
      nodes.forEach((el) => {
        el.classList.remove('city-text--fade-out');
        el.classList.add('city-text--fade-in');
      });
      window.setTimeout(() => {
        nodes.forEach((el) => {
          el.classList.remove('city-text--fade-in');
        });
      }, 500);
    }, fadeMs);
  }

  function startRotation() {
    clearInterval(timer);
    if (cities.length <= 1) return;
    timer = window.setInterval(fadeOutThenSwap, intervalMs);
  }

  if (cities.length === 0) {
    nodes.forEach((el) => {
      el.textContent = '';
    });
    return;
  }

  if (cities.length === 1) {
    applyStatic(cities[0]);
    return;
  }

  nodes.forEach((el) => {
    el.setAttribute('aria-live', 'polite');
  });

  setText(cities[0]);
  startRotation();

  window.partyCityRotator = {
    getCities() {
      return cities.slice();
    },
    setCities(next) {
      if (!Array.isArray(next) || !next.length) return;
      cities.length = 0;
      next.forEach((c) => cities.push(String(c)));
      index = 0;
      nodes.forEach((el) => {
        el.classList.remove('city-text--fade-out', 'city-text--fade-in');
      });
      if (cities.length === 1) {
        applyStatic(cities[0]);
      } else {
        nodes.forEach((el) => {
          el.classList.remove('city-text--static');
          el.setAttribute('aria-live', 'polite');
        });
        setText(cities[0]);
        startRotation();
      }
    },
  };
})();

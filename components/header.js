// components/header.js

(function () {
  function injectSkyInto(el) {
    if (!el) return;

    // prevent duplicates
    if (el.classList.contains("has-sky")) return;

    el.classList.add("has-sky");

    const sky = document.createElement("div");
    sky.className = "sky";
    sky.innerHTML = `
      <div class="sun"></div>
      <div class="cloud c1"></div>
      <div class="cloud c2"></div>
      <div class="cloud c3"></div>
      <div class="sparkle s1"></div>
      <div class="sparkle s2"></div>
      <div class="sparkle s3"></div>
    `;

    // insert sky as first child (behind everything)
    el.insertBefore(sky, el.firstChild);
  }

  function run() {
    // 1) Your lesson2 header uses .top
    const top = document.querySelector(".top");
    if (top) injectSkyInto(top);

    // 2) Your lesson1 header uses .header-box (optional)
    const headerBox = document.querySelector(".header-box");
    if (headerBox) injectSkyInto(headerBox);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

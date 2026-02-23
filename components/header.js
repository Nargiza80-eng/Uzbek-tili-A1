/* components/header.js
   Adds animated sky (sun + clouds + sparkles) into your existing header container.
   Works with: .header-box (lesson1) OR .top (lesson2) OR #header-container (optional)
*/

(function () {
  function findHeaderRoot() {
    // 1) Prefer existing lesson containers
    const byClass = document.querySelector(".header-box") || document.querySelector(".top");
    if (byClass) return byClass;

    // 2) Optional: if user created a container
    const byId = document.getElementById("header-container");
    if (byId) return byId;

    return null;
  }

  function ensureSkyLayer(root) {
    // Add class that enables sky styling
    root.classList.add("has-sky");

    // If already exists, do nothing (prevents duplicates)
    if (root.querySelector(":scope > .sky")) return;

    // Create sky layer
    const sky = document.createElement("div");
    sky.className = "sky";

    // Sun
    const sun = document.createElement("div");
    sun.className = "sun";
    sky.appendChild(sun);

    // Clouds
    const c1 = document.createElement("div");
    c1.className = "cloud c1";
    sky.appendChild(c1);

    const c2 = document.createElement("div");
    c2.className = "cloud c2";
    sky.appendChild(c2);

    const c3 = document.createElement("div");
    c3.className = "cloud c3";
    sky.appendChild(c3);

    // Sparkles
    const s1 = document.createElement("div");
    s1.className = "sparkle s1";
    sky.appendChild(s1);

    const s2 = document.createElement("div");
    s2.className = "sparkle s2";
    sky.appendChild(s2);

    const s3 = document.createElement("div");
    s3.className = "sparkle s3";
    sky.appendChild(s3);

    // Insert sky as FIRST child (behind everything)
    root.insertBefore(sky, root.firstChild);
  }

  // Public function: call in each lesson after header exists in DOM
  window.renderSkyHeader = function () {
    const root = findHeaderRoot();
    if (!root) {
      console.warn("renderSkyHeader(): No header container found (.header-box or .top).");
      return;
    }
    ensureSkyLayer(root);
  };

  // Auto-run after DOM loaded (so even if you forget to call it, it still works)
  document.addEventListener("DOMContentLoaded", () => {
    window.renderSkyHeader();
  });
})();

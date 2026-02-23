/* ==== DONO BOLA HEADER ==== */

function renderHeader(titleText){
  const el = document.getElementById("header-container");
  if(!el) return;

  el.innerHTML = `
    <div class="header-box">
      <div class="sun">☀️</div>
      <div class="cloud c1">☁️</div>
      <div class="cloud c2">☁️</div>

      <div class="top-row">
        <button class="topIcon" onclick="goHome()">🏠</button>
        <div class="header-title">${titleText}</div>
        <button class="topIcon" onclick="toggleAlbum()">📖</button>
      </div>

      <div class="progress-container">
        <div class="progress-fill" id="progressFill"></div>
      </div>

      <div id="progressText">0 / 10</div>

      <div class="lang-switch">
        <button class="lang-btn active" id="langUZ" onclick="setLang('uz')">UZ</button>
        <button class="lang-btn" id="langEN" onclick="setLang('en')">EN</button>
      </div>
    </div>
  `;
}

function goHome(){
  window.location.href = "index.html";
}

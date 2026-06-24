/* components/header.js
   Renders a complete animated header (sky + sun + clouds + progress + UZ/EN + home/book).
   Usage:
     <div id="lessonHeader"></div>
     <script>renderLessonHeader({ mountId:"lessonHeader", title:"2-dars: Sonlar", total:10, homeHref:"index.html" });</script>

   Then you update progress with:
     setHeaderProgress({ learned: 3 }); // learned out of total
*/

(function(){
  const DEFAULTS = {
    mountId: "lessonHeader",
    title: "Dars",
    total: 10,
    learned: 0,
    homeHref: "index.html",
    // bookAction: "learn" will scroll to #panel-learn if exists, otherwise do nothing
    bookTargetId: "panel-learn",
    lang: "uz",
    onLangChange: null, // optional callback(lang)
  };

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function scrollToId(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
  }

  function buildHeaderHTML(opts){
    const learned = clamp(Number(opts.learned || 0), 0, opts.total);
    const pct = opts.total ? (learned / opts.total) * 100 : 0;

    return `
      <div class="dono-header" data-total="${opts.total}">
        <div class="sky">
          <div class="sun"></div>
          <div class="cloud c1"></div>
          <div class="cloud c2"></div>
          <div class="cloud c3"></div>
          <div class="sparkle s1"></div>
          <div class="sparkle s2"></div>
          <div class="sparkle s3"></div>
        </div>

        <div class="content">
          <div class="top-row">
            <a class="topIcon" href="${opts.homeHref}" aria-label="Home">🏠</a>

            <div class="titleWrap">
              <h1 class="title" id="hdrTitle">${opts.title}</h1>
              <div class="sub" id="hdrSub">${learned} / ${opts.total} o‘rganildi</div>
            </div>

            <button class="topIcon" id="hdrBookBtn" aria-label="Book" type="button">📖</button>
          </div>

          <div class="progress-track">
            <div class="progress-fill" id="hdrFill" style="width:${pct}%"></div>
          </div>

          <div class="mini" id="hdrMini">${learned} / ${opts.total}</div>

          <div class="langRow">
            <button class="langBtn ${opts.lang==="uz" ? "active" : ""}" id="hdrUZ" type="button">UZ</button>
            <button class="langBtn ${opts.lang==="en" ? "active" : ""}" id="hdrEN" type="button">EN</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachHeaderEvents(root, opts){
    const bookBtn = root.querySelector("#hdrBookBtn");
    const uzBtn = root.querySelector("#hdrUZ");
    const enBtn = root.querySelector("#hdrEN");

    if(bookBtn){
      bookBtn.addEventListener("click", () => {
        if(opts.bookTargetId) scrollToId(opts.bookTargetId);
      });
    }

    const setLangUI = (lang) => {
      uzBtn?.classList.toggle("active", lang==="uz");
      enBtn?.classList.toggle("active", lang==="en");
    };

    uzBtn?.addEventListener("click", () => {
      setLangUI("uz");
      if(typeof opts.onLangChange === "function") opts.onLangChange("uz");
    });

    enBtn?.addEventListener("click", () => {
      setLangUI("en");
      if(typeof opts.onLangChange === "function") opts.onLangChange("en");
    });
  }

  // PUBLIC: render header
  window.renderLessonHeader = function(options){
    const opts = {...DEFAULTS, ...(options||{})};
    const mount = document.getElementById(opts.mountId);
    if(!mount){
      console.warn("renderLessonHeader(): mount element not found:", opts.mountId);
      return;
    }
    mount.innerHTML = buildHeaderHTML(opts);
    attachHeaderEvents(mount, opts);
  };

  // PUBLIC: update progress text + bar (call from your lesson logic)
  window.setHeaderProgress = function({ learned, total } = {}){
    const header = document.querySelector(".dono-header");
    if(!header) return;

    const t = total ?? Number(header.getAttribute("data-total") || 10);
    const l = clamp(Number(learned ?? 0), 0, t);
    const pct = t ? (l / t) * 100 : 0;

    const sub = header.querySelector("#hdrSub");
    const mini = header.querySelector("#hdrMini");
    const fill = header.querySelector("#hdrFill");

    if(sub) sub.textContent = `${l} / ${t} o‘rganildi`;
    if(mini) mini.textContent = `${l} / ${t}`;
    if(fill) fill.style.width = pct + "%";
  };
})();

/* =========================================================
   EDIT YOUR CONTENT HERE
   Everything personal on the site comes from this object.
   ========================================================= */
const SITE = {
  name: "Dzenita Musabegovic",
  email: "hello@dzenitamusabegovic.com",      // TODO: replace with your real email
  github: "dzenitamusabegovic",
  status: "Open to new opportunities",
  location: "Your city",                       // TODO: e.g. "Chicago, USA"
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // TODO: e.g. "America/Chicago"
  roles: ["creative problem-solver.", "lifelong learner.", "builder of things.", "team player."], // TODO

  now: [
    { ico: "🛠️", text: "Building this portfolio" },
    { ico: "📚", text: "Placeholder: something I'm learning" },
    { ico: "🎯", text: "Placeholder: what I'm focused on" },
  ],

  toolkit: [
    ["Placeholder", "#7a2238"], ["Skill two", "#5f7a45"], ["Skill three", "#b8893a"],
    ["Tool four", "#6e2a4f"], ["Tool five", "#d9a5a8"], ["Skill six", "#3f5a34"],
    ["Tool seven", "#9b3b52"], ["Skill eight", "#8a6a3a"],
  ],

  projects: [
    { title: "Project One", year: "2026", cat: "Design", desc: "Placeholder: one or two lines on the problem, your role and the outcome.", tags: ["Tag", "Tag"], url: "#", art: ["#8c2a40", "#5a1626"] },
    { title: "Project Two", year: "2025", cat: "Development", desc: "Placeholder: one or two lines on the problem, your role and the outcome.", tags: ["Tag", "Tag"], url: "#", art: ["#6f8a55", "#3f5a34"] },
    { title: "Project Three", year: "2025", cat: "Research", desc: "Placeholder: one or two lines on the problem, your role and the outcome.", tags: ["Tag", "Tag"], url: "#", art: ["#e2b3b5", "#cf9396"] },
    { title: "Project Four", year: "2024", cat: "Development", desc: "Placeholder: one or two lines on the problem, your role and the outcome.", tags: ["Tag", "Tag"], url: "#", art: ["#7c3459", "#4e1a37"] },
  ],

  experience: [
    { role: "Role title", org: "Company name", date: "2024 — Present", desc: "Placeholder: what you did and the impact it had." },
    { role: "Role title", org: "Company name", date: "2022 — 2024", desc: "Placeholder: what you did and the impact it had." },
    { role: "Degree / Program", org: "School name", date: "2018 — 2022", desc: "Placeholder: focus area, honors, relevant work." },
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/dzenitamusabegovic", icon: "github" },
    { label: "LinkedIn", url: "#", icon: "linkedin" },   // TODO
    { label: "Resume", url: "#", icon: "file" },         // TODO
  ],
};

/* ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

$("#year").textContent = new Date().getFullYear();
$("#statusText").textContent = SITE.status;
$("#mailBtn").href = `mailto:${SITE.email}`;
$("#panelLoc").textContent = SITE.location;
$("#panelNow").textContent = SITE.now[0].text.toLowerCase();
$("#panelStatus").textContent = SITE.status;

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

/* ---------- copy email ---------- */
async function copyEmail() {
  try { await navigator.clipboard.writeText(SITE.email); toast("Email copied ✓"); }
  catch { toast(SITE.email); }
}
$$("[data-copy-email]").forEach((b) => b.addEventListener("click", copyEmail));

/* ---------- theme ---------- */
function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  document.querySelector('meta[name="theme-color"]').content = next === "light" ? "#f6efe6" : "#2a1519";
}
$("#themeToggle").addEventListener("click", toggleTheme);

/* ---------- typing effect ---------- */
(function typed() {
  const el = $("#typed");
  if (reduced) { el.textContent = SITE.roles[0]; return; }
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = SITE.roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i < word.length) i++;
    else if (del && i > 0) i--;
    else if (!del) { del = true; return setTimeout(tick, 1600); }
    else { del = false; r = (r + 1) % SITE.roles.length; }
    setTimeout(tick, del ? 35 : 70);
  })();
})();

/* ---------- scroll progress + active nav ---------- */
const prog = $(".progress");
const navLinks = $$(".nav-links a");
function onScroll() {
  const h = document.documentElement;
  $(".nav").classList.toggle("scrolled", h.scrollTop > 20);
  prog.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  let current = "";
  $$("main section[id]").forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id; });
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
function observeReveals() { $$(".reveal:not(.in)").forEach((el, i) => { el.style.transitionDelay = `${(i % 6) * 60}ms`; io.observe(el); }); }

/* ---------- spotlight tiles ---------- */
document.addEventListener("pointermove", (e) => {
  const t = e.target.closest(".spotlight");
  if (!t) return;
  const r = t.getBoundingClientRect();
  t.style.setProperty("--mx", `${e.clientX - r.left}px`);
  t.style.setProperty("--my", `${e.clientY - r.top}px`);
}, { passive: true });

/* ---------- magnetic buttons ---------- */
if (!reduced && matchMedia("(hover: hover)").matches) {
  $$(".magnetic").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      b.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------- clock widget ---------- */
(function clock() {
  const ticks = $("#ticks");
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180, r1 = i % 3 ? 40 : 37;
    ticks.insertAdjacentHTML("beforeend", `<line x1="${50 + Math.sin(a) * r1}" y1="${50 - Math.cos(a) * r1}" x2="${50 + Math.sin(a) * 43}" y2="${50 - Math.cos(a) * 43}"/>`);
  }
  $("#clockLoc").textContent = SITE.location;
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false });
  const fmtShow = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, hour: "numeric", minute: "2-digit" });
  function update() {
    const now = new Date();
    const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, +p.value]));
    const hh = parts.hour % 24, mm = parts.minute, ss = parts.second;
    $("#hHand").style.transform = `rotate(${(hh % 12) * 30 + mm * 0.5}deg)`;
    $("#mHand").style.transform = `rotate(${mm * 6 + ss * 0.1}deg)`;
    $("#sHand").style.transform = `rotate(${ss * 6}deg)`;
    $("#clockDigital").textContent = fmtShow.format(now);
    $("#dayIcon").textContent = hh >= 6 && hh < 19 ? "☀️" : "🌙";
  }
  update(); setInterval(update, 1000);
})();

/* ---------- now list ---------- */
$("#nowList").innerHTML = SITE.now.map((n) => `<li><span class="ico">${n.ico}</span><span>${esc(n.text)}</span></li>`).join("");

/* ---------- toolkit marquee ---------- */
(function stack() {
  const pills = (arr) => arr.map(([n, c]) => `<span class="pill"><i style="background:${c}"></i>${esc(n)}</span>`).join("");
  const half = Math.ceil(SITE.toolkit.length / 2);
  const a = SITE.toolkit.slice(0, half), b = SITE.toolkit.slice(half);
  $("#stackTrack").innerHTML = pills([...a, ...a, ...a, ...a]);
  $("#stackTrack2").innerHTML = pills([...b, ...b, ...b, ...b]);
})();

/* ---------- count-up stats ---------- */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.to, start = performance.now(), dur = 1400;
    (function step(now) {
      const p = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(step);
    })(start);
    countIO.unobserve(el);
  });
}, { threshold: 0.5 });
$$(".count").forEach((el) => countIO.observe(el));

/* ---------- live GitHub widget ---------- */
(async function github() {
  try {
    const u = await fetch(`https://api.github.com/users/${SITE.github}`).then((r) => r.ok ? r.json() : Promise.reject());
    $("#ghRepos").textContent = u.public_repos;
    $("#ghFollowers").textContent = u.followers;
    const repos = await fetch(`https://api.github.com/users/${SITE.github}/repos?sort=pushed&per_page=1`).then((r) => r.ok ? r.json() : []);
    if (repos[0]) {
      const a = $("#ghLatest");
      a.href = repos[0].html_url;
      a.innerHTML = `<span><span class="muted tiny">Latest push · </span><span class="mono">${esc(repos[0].name)}</span></span><span aria-hidden="true">↗</span>`;
    }
  } catch { /* leave placeholders */ }
})();

/* ---------- projects ---------- */
(function projects() {
  const wrap = $("#projects");
  wrap.innerHTML = SITE.projects.map((p, i) => `
    <a class="project reveal" href="${esc(p.url)}" data-cat="${esc(p.cat)}">
      <span class="arrow" aria-hidden="true">↗</span>
      <div class="project-media">
        <div class="art" style="--c1:${p.art[0]};--c2:${p.art[1]}"><span class="art-num">${String(i + 1).padStart(2, "0")}</span><span class="art-cat">${esc(p.cat)}</span></div>
      </div>
      <div class="project-body">
        <div class="project-top"><h3>${esc(p.title)}</h3><span class="year">${esc(p.year)}</span></div>
        <p>${esc(p.desc)}</p>
        <div class="tags">${[p.cat, ...p.tags].map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </a>`).join("");

  const cats = ["All", ...new Set(SITE.projects.map((p) => p.cat))];
  $("#filters").innerHTML = cats.map((c, i) => `<button class="filter${i ? "" : " active"}" data-f="${esc(c)}">${esc(c)}</button>`).join("");
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter").forEach((x) => x.classList.toggle("active", x === b));
    $$(".project").forEach((p) => p.classList.toggle("hide", b.dataset.f !== "All" && p.dataset.cat !== b.dataset.f));
  });

  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$(".project").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }
})();

/* ---------- timeline ---------- */
$("#timeline").innerHTML = SITE.experience.map((x) => `
  <li class="tl-item reveal"><div class="tl-card">
    <div><div class="tl-role">${esc(x.role)}</div><div class="tl-org">${esc(x.org)}</div></div>
    <div class="tl-date">${esc(x.date)}</div>
    <p class="tl-desc">${esc(x.desc)}</p>
  </div></li>`).join("");

/* ---------- socials ---------- */
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
};
$("#socials").innerHTML = SITE.socials.map((s) => `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener">${ICONS[s.icon] || ""}${esc(s.label)}</a>`).join("");

observeReveals();

/* ---------- command palette ---------- */
(function palette() {
  const pal = $("#palette"), input = $("#paletteInput"), list = $("#paletteList");
  const go = (id) => () => document.getElementById(id).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  const cmds = [
    { ico: "🏠", label: "Home", grp: "Go to", run: go("top") },
    { ico: "👋", label: "About", grp: "Go to", run: go("about") },
    { ico: "🗂️", label: "Work", grp: "Go to", run: go("work") },
    { ico: "🧭", label: "Experience", grp: "Go to", run: go("experience") },
    { ico: "✉️", label: "Contact", grp: "Go to", run: go("contact") },
    { ico: "🌓", label: "Toggle theme", grp: "Action", run: toggleTheme },
    { ico: "📋", label: "Copy email", grp: "Action", run: copyEmail },
    ...SITE.socials.map((s) => ({ ico: "↗", label: `Open ${s.label}`, grp: "Link", run: () => open(s.url, "_blank", "noopener") })),
  ];
  let filtered = cmds, sel = 0;
  function render() {
    const q = input.value.trim().toLowerCase();
    filtered = cmds.filter((c) => c.label.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, filtered.length - 1));
    list.innerHTML = filtered.length
      ? filtered.map((c, i) => `<li role="option" aria-selected="${i === sel}" data-i="${i}"><span class="ico">${c.ico}</span>${esc(c.label)}<span class="grp">${c.grp}</span></li>`).join("")
      : `<li class="muted">No results</li>`;
  }
  function openP() { pal.hidden = false; input.value = ""; sel = 0; render(); setTimeout(() => input.focus(), 10); }
  function closeP() { pal.hidden = true; }
  function run(i) { const c = filtered[i]; if (!c) return; closeP(); c.run(); }
  $("#openPalette").addEventListener("click", openP);
  input.addEventListener("input", () => { sel = 0; render(); });
  list.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) run(+li.dataset.i); });
  list.addEventListener("pointermove", (e) => { const li = e.target.closest("li[data-i]"); if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; render(); } });
  pal.addEventListener("click", (e) => { if (e.target === pal) closeP(); });
  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? openP() : closeP(); return; }
    if (pal.hidden) return;
    if (e.key === "Escape") closeP();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % filtered.length; render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; render(); }
    else if (e.key === "Enter") { e.preventDefault(); run(sel); }
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) {
    $("#openPalette").innerHTML = "Ctrl&nbsp;K";
    $$(".footer kbd")[0].textContent = "Ctrl";
  }
})();

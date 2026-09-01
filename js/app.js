/* =========================================================
 * app.js — 渲染引擎（组件化 / 数据驱动）
 * 所有内容来自 js/data.js 的 SITE_DATA，本文件无需日常修改。
 * ========================================================= */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isPlaceholder = (t) => !t || /待补充|待替换/.test(t);

  /* 仅对带 highlightNums 标记的条目，把数据数字（万/亿/¥/% 等）包成强调样式，
     不整行加粗；先 esc 保证安全，再包裹数字片段。 */
  const highlightNums = (s) =>
    esc(s).replace(
      /(\d+(?:\.\d+)?\s*[万亿]+\+?)|(¥\s*\d+(?:\.\d+)?)|(\d+(?:\.\d+)?%)/g,
      (m) => `<span class="num-hl">${m}</span>`
    );

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
  }

  /* ---------- 联系动作（Profile 与「联系我」共用） ---------- */
  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }

  const contactActions = {
    email(c) {
      if (!c.email) return toast("邮箱待补充");
      copyText(c.email, () => toast("已复制邮箱"));
    },
    wechat(c) {
      if (!c.wechat) return toast("微信号待补充");
      copyText(c.wechat, () => toast("已复制微信号"));
    },
    resume(c) {
      if (!c.resume) return toast("简历文件待上传");
      // 电脑端 / 手机端 / App 内置浏览器统一：进入站内简历预览页，由用户在预览页主动点击「下载 PDF」
      window.location.href = "resume/";
    }
  };
  /* 简历入口按压反馈：与【微信】等联系卡片共用 .contact-card:active / .contact-card.is-opening 橙色调样式；
     首页右上角按钮复用 .action-btn.is-opening 按压态。点击即进入按下态并立即跳转 /resume，
     无人为延迟、无“正在打开…”长提示（点击反馈后立即跳转）。 */
  function pressFeedback(el, fn) {
    const press = () => el.classList.add("is-opening");
    el.addEventListener("pointerdown", press, { passive: true });
    el.addEventListener("touchstart", press, { passive: true });
    el.addEventListener("pointercancel", () => el.classList.remove("is-opening"));
    el.addEventListener("click", () => { el.classList.add("is-opening"); fn(); });
  }

  function fallbackCopy(text, done) {
    const ta = el("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("复制失败，请手动记录"); }
    ta.remove();
  }

  const CONTACT_DEFS = [
    { key: "email",  icon: "📧", label: "邮箱",   sub: "点击复制邮箱地址" },
    { key: "wechat", icon: "💬", label: "微信",   sub: "微信号：sututu797" },
    { key: "resume", icon: "➡️", label: "查看简历",   sub: "在线预览 · 支持下载" }
  ];

  /* =========================================================
   * Profile Card
   * ========================================================= */
  function renderProfile() {
    const p = SITE_DATA.profile;
    $("#profile-name-cn").textContent = p.name;
    $("#profile-name-en").textContent = p.nameEn;
    $("#profile-title").textContent = p.title;
    $("#profile-tagline").textContent = p.tagline;

    /* 个人信息（出生年月 / 现居地） */
    const metaBox = $("#profile-meta");
    if (metaBox) {
      metaBox.innerHTML = (p.meta || [])
        .map((m) => `<span class="meta-item"><span class="meta-label">${esc(m.label)}</span>${esc(m.value)}</span>`)
        .join("");
    }

    const avatar = $("#profile-avatar");
    avatar.innerHTML = "";
    if (p.avatar) {
      const img = el("img");
      img.src = p.avatar;
      img.alt = p.name;
      avatar.appendChild(img);
    } else {
      avatar.textContent = p.name.charAt(0); // 头像待补充时显示姓氏首字
    }

    const actions = $("#profile-actions");
    actions.innerHTML = "";
    CONTACT_DEFS.forEach((d) => {
      const btn = el("button", "action-btn" + (d.key === "resume" ? " primary" : ""));
      btn.innerHTML = `<span>${d.icon}</span><span>${esc(d.label)}</span>`;
      if (d.key === "resume") pressFeedback(btn, () => contactActions.resume(p.contacts));
      else btn.addEventListener("click", () => contactActions[d.key](p.contacts));
      actions.appendChild(btn);
    });

    $("#footer-text").textContent =
      `© ${new Date().getFullYear()} ${p.name} ${p.nameEn} · Marketing Portfolio`;
  }

  /* =========================================================
   * Tab 导航
   * ========================================================= */
  const TABS = [
    { id: "experience", label: "工作经历", en: "Experience" },
    { id: "cases",      label: "案例作品", en: "Case Studies" },
    { id: "skills",     label: "专业能力", en: "Skills" },
    { id: "contact",    label: "联系我",   en: "Contact" }
  ];
  let activeTab = "cases"; // 默认落在最重要的案例模块

  function renderTabs() {
    const bar = $("#tab-bar");
    bar.innerHTML = "";
    TABS.forEach((t) => {
      const btn = el("button", "tab-item" + (t.id === activeTab ? " active" : ""));
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", t.id === activeTab ? "true" : "false");
      btn.innerHTML = `<span class="tab-label">${esc(t.label)}</span><span class="tab-sub">${esc(t.en)}</span>`;
      btn.addEventListener("click", () => {
        if (activeTab === t.id) return;
        activeTab = t.id;
        renderTabs();
        renderContent();
        if (t.id === "contact") prefetchResume(); // 进入联系模块即预热简历预览页资源
      });
      bar.appendChild(btn);
    });
  }

  function renderContent() {
    const area = $("#content-area");
    area.classList.remove("switching");
    void area.offsetWidth; // 重新触发切换动画
    area.classList.add("switching");
    area.innerHTML = "";
    ({ experience: renderExperience,
       cases: renderCases,
       skills: renderSkills,
       contact: renderContact }[activeTab])(area);
  }

  function sectionHead(area, cn, en) {
    area.appendChild(el("div", "section-head", `<h2>${esc(cn)}</h2><span class="en">${esc(en)}</span>`));
  }

  /* =========================================================
   * 工作经历（Timeline + 了解更多 Accordion）
   * ========================================================= */
  const expOpen = new Set(); // 记录展开状态（跨切换保留）

  function renderExperience(area) {
    sectionHead(area, "工作经历", "Experience");
    const tl = el("div", "timeline");
    SITE_DATA.experience.forEach((e, idx) => {
      const item = el("div", "exp-item");
      item.innerHTML = `
        <div class="exp-head">
          <span class="exp-company">${esc(e.company)}</span>
          <span class="exp-role">${esc(e.role)}</span>
          <span class="exp-period">${esc(e.period)}</span>
        </div>
        <div class="exp-tags">${e.tags.map((t) => `<span class="exp-tag">${esc(t)}</span>`).join("")}</div>`;

      /* 有详情内容时才显示「了解更多」 */
      const hasDetail = e.intro || (e.achievements && e.achievements.length);
      if (hasDetail) {
        const opened = expOpen.has(idx);
        const toggle = el("button", "exp-toggle" + (opened ? " open" : ""));
        toggle.innerHTML = `<span>${opened ? "收起 ↑" : "了解更多 →"}</span>`;
        toggle.setAttribute("aria-expanded", opened ? "true" : "false");

        const bio = e.intro ? `<p class="exp-intro">${esc(e.intro)}</p>` : "";
        const ach = (e.achievements && e.achievements.length)
          ? `<ul class="bullet-list exp-achievements">${e.achievements.map((d) => `<li>${e.highlightNums ? highlightNums(d) : esc(d)}</li>`).join("")}</ul>`
          : "";
        const detail = el("div", "exp-detail" + (opened ? " open" : ""));
        detail.innerHTML = `<div class="exp-detail-inner">${bio}${ach}</div>`;

        toggle.addEventListener("click", () => {
          const isOpen = expOpen.has(idx);
          if (isOpen) expOpen.delete(idx); else expOpen.add(idx);
          toggle.classList.toggle("open", !isOpen);
          detail.classList.toggle("open", !isOpen);
          toggle.querySelector("span").textContent = !isOpen ? "收起 ↑" : "了解更多 →";
          toggle.setAttribute("aria-expanded", String(!isOpen));
        });

        item.appendChild(toggle);
        item.appendChild(detail);
      }
      tl.appendChild(item);
    });
    area.appendChild(tl);
  }

  /* =========================================================
   * 案例作品（分组导航 + 手机 Mockup）
   * ========================================================= */
  let activeCaseId = null;
  let activeMediaIdx = 0;
  let mobileOpenId = null;           // 移动端 Accordion 当前展开案例
  const groupCollapsed = new Set(); // 仅桌面端分组折叠
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function caseGroups() {
    const order = [];
    const map = {};
    SITE_DATA.cases.forEach((c) => {
      const g = c.group || "其他";
      if (!map[g]) { map[g] = []; order.push(g); }
      map[g].push(c);
    });
    return order.map((g) => ({ name: g, items: map[g] }));
  }

  function renderCases(area) {
    sectionHead(area, '案例作品', 'Case Studies');
    if (!SITE_DATA.cases.length) {
      area.appendChild(el('p', 'case-block', '案例整理中…'));
      return;
    }
    /* 桌面端默认选中第一个；移动端默认不展开（由 mobileOpenId 控制） */
    if (!SITE_DATA.cases.some((c) => c.id === activeCaseId)) {
      activeCaseId = SITE_DATA.cases[0].id;
    }
    if (isMobile()) renderCasesMobile(area);
    else renderCasesDesktop(area);
  }

  /* ---------- 构建案例详情（桌面 / 移动共用同一份数据） ---------- */
  function buildCaseDetail(c) {
    if (c.layout === "event") return buildEventDetail(c);
    if (c.layout === "matrix") return buildMatrixDetail(c);
    const detail = el('div', 'case-detail');

    /* 手机 Mockup 列 */
    const phoneCol = el('div', 'phone-col');
    const mockup = el('div', 'phone-mockup');
    const screen = el('div', 'phone-screen');
    mockup.appendChild(screen);
    phoneCol.appendChild(mockup);

    const media = c.media || [];
    const cur = media[activeMediaIdx];
    renderScreen(screen, cur, c);

    if (media.length) {
      const strip = el('div', 'thumb-strip');
      media.forEach((m, i) => {
        const t = el('button', 'thumb' + (i === activeMediaIdx ? ' active' : ''));
        t.title = m.label;
        t.innerHTML = `<span>${mediaIcon(m.type)}</span><span class="t-label">${esc(m.label)}</span>`;
        t.addEventListener('click', () => {
          if (activeMediaIdx === i) return;
          activeMediaIdx = i;
          /* 桌面/移动端统一：仅局部交叉淡入切换屏幕，不整页重建，避免黑屏与重排 */
          renderScreen(screen, media[i], c);
          strip.querySelectorAll('.thumb').forEach((th, ti) => th.classList.toggle('active', ti === i));
        });
          /* 按需预加载：悬停/聚焦时才下载该主图，避免首次打开时一次性加载全部大图；点击后也不白屏 */
          const preloadOne = () => {
            if (m.type === 'image' && m.src && !m._preloaded) {
              m._preloaded = true;
              const im = new Image();
              if (m.srcset) im.srcset = m.srcset;
              im.src = m.src;
            }
          };
          t.addEventListener('mouseenter', preloadOne);
          t.addEventListener('focus', preloadOne);
          strip.appendChild(t);
        });
        phoneCol.appendChild(strip);
      }
    detail.appendChild(phoneCol);

    /* 文字信息列：项目介绍 + 操作说明 */
    const info = el('div', 'case-info');

    const oBlk = el('div', 'case-block');
    oBlk.innerHTML = `<h4>项目介绍</h4>
      <div class="outcome-card ${isPlaceholder(c.outcome) ? 'placeholder' : ''}">${esc(c.outcome || '项目介绍（待补充）')}</div>`;
    info.appendChild(oBlk);

    /* 项目成效模块（仅东阿阿胶） */
    const results = buildProjectResults(c);
    if (results) info.appendChild(results);

    info.appendChild(el('p', 'case-hint-inline',
      '手机代表展示案例，点击即可跳转；点击缩略图可切换'));

    detail.appendChild(info);

    /* 预加载下一个案例首图，切换时秒开（不预加载其余案例） */
    const cIdx = SITE_DATA.cases.findIndex((x) => x.id === c.id);
    if (cIdx >= 0 && cIdx + 1 < SITE_DATA.cases.length) {
      const nxt = (SITE_DATA.cases[cIdx + 1].media || [])[0];
      if (nxt && nxt.type === "image" && nxt.src) {
        const pre = new Image();
        pre.src = nxt.src;
      }
    }

    return detail;
  }

  /* ---------- 多平台矩阵案例（武志红 IP）：4 平台小手机并列 ---------- */
  function buildMatrixDetail(c) {
    const detail = el('div', 'case-detail matrix-detail');

    /* 项目介绍（顶部整行，沿用现有标题/样式，文案不变） */
    const intro = el('div', 'case-block matrix-intro');
    intro.innerHTML = `<h4>项目介绍</h4>
      <div class="outcome-card ${isPlaceholder(c.outcome) ? 'placeholder' : ''}">${esc(c.outcome || '项目介绍（待补充）')}</div>`;
    detail.appendChild(intro);

    const matrix = (c.matrix || []).filter((x) => x && x.platform);
    const row = el('div', 'matrix-row');
    matrix.forEach((cell) => {
      const m = cell.media || {};
      const cellEl = el('div', 'matrix-cell');

      const mockup = el('div', 'phone-mockup matrix-phone');
      const screen = el('div', 'phone-screen');
      mockup.appendChild(screen);
      renderScreen(screen, m, c); // 有 src→真图(可点击跳转)；无 src→屏内占位
      cellEl.appendChild(mockup);

      /* 平台标签/按钮：样式与案例切换标签统一；有链接可点击跳转 */
      const tag = el('button', 'matrix-tag');
      tag.type = 'button';
      tag.textContent = cell.platform;
      if (m.link) {
        tag.addEventListener('click', () => window.open(m.link, '_blank', 'noopener'));
      } else {
        // 无公开链接（如视频号）：视觉样式与其它平台完全一致，仅拦截点击、不跳转
        tag.addEventListener('click', (e) => e.preventDefault());
      }
      cellEl.appendChild(tag);

      row.appendChild(cellEl);
    });
    detail.appendChild(row);

    return detail;
  }

  /* ---------- 项目成效模块（仅东阿阿胶） ---------- */
  function buildProjectResults(c) {
    if (!c || !c.results) return null;
    const r = c.results;
    const isDoctor = r.mode === "doctor";

    /* 和兴白花油：双平台分开展示 + 自定义信息图（极简进度条 + 圆形 Badge） */
    if (r.infoGraphic) {
      const wrap = el('div', 'case-block results-block');
      const expCards = (r.exposure || []).map((e) =>
        `<div class="result-card"><div class="rc-value">${esc(e.value)}</div><div class="rc-label">${esc(e.label)}</div></div>`).join('');
      const costBoxes = (r.cost || []).map((cb) =>
        `<div class="cost-box"><div class="cost-box-title">${esc(cb.label)}</div>` +
        (cb.items || []).map((it) =>
          `<div class="cost-row"><span class="cost-k">${esc(it.k)}</span><span class="cost-v">${esc(it.v)}</span></div>`).join('') +
        `</div>`).join('');
      const igMods = (r.infoGraphic.modules || []).map((m) => {
        const tNum = parseFloat(m.target), aNum = parseFloat(m.actual);
        const tPct = (tNum && aNum) ? Math.max(8, Math.round(tNum / aNum * 100)) : 50;
        return `<div class="ig-module">
          <div class="ig-head">
            <div class="ig-title">${esc(m.title)}</div>
            <div class="ig-badge"><span class="ig-rate-label">${esc(m.rateLabel || '完成率')}</span><span class="ig-rate">${esc(m.rate)}</span></div>
          </div>
          <div class="ig-bar-row">
            <div class="ig-bar-label"><span>${esc(m.targetLabel)}</span><span>${esc(m.target)}</span></div>
            <div class="ig-bar-track"><div class="ig-bar-fill ig-bar-target" style="width:${tPct}%"></div></div>
          </div>
          <div class="ig-bar-row">
            <div class="ig-bar-label"><span>${esc(m.actualLabel)}</span><span>${esc(m.actual)}</span></div>
            <div class="ig-bar-track"><div class="ig-bar-fill ig-bar-actual" style="width:100%"></div></div>
          </div>
        </div>`;
      }).join('');
      wrap.innerHTML =
        `<h4>项目成效</h4>
         <div class="result-cards">${expCards}</div>
         <div class="cost-row-wrap">${costBoxes}</div>
         <div class="info-graphic">${igMods}</div>
         <div class="result-summary">${esc(r.summary || '')}</div>`;
      return wrap;
    }

    const wrap = el('div', 'case-block results-block');
    const cards = (r.metrics || []).map((m) =>
      `<div class="result-card${m.main ? ' rc-main' : ''}">
        <div class="rc-value">${esc(m.value)}</div>
        <div class="rc-label">${esc(m.label)}</div>
      </div>`).join('');
    let html =
      `<h4>项目成效</h4>
       <div class="result-cards${isDoctor ? ' result-cards--3' : ''}">${cards}</div>`;
    if (!isDoctor) {
      if (r.figure && r.figure.webp) {
        /* 关键成果图：响应式 WebP（桌面 900 / 移动 600，展示变体 == 预加载变体），
           eager + decode 异步，与 index.html 的 preload 及 init 时的 Image().decode()
           预加载命中同一 URL，切换项目时直接复用浏览器缓存，不再展开后才请求或重新解码。 */
        const f = r.figure;
        const wh = (f.w && f.h) ? ` width="${f.w}" height="${f.h}"` : '';
        const srcset = f.webpSmall
          ? ` srcset="${esc(f.webpSmall)} 600w, ${esc(f.webp)} 900w" sizes="${esc(f.sizes || '(max-width: 768px) 320px, 460px')}"`
          : ``;
        const onErr = f.fallback
          ? ` onerror="this.onerror=null;this.src='${esc(f.fallback)}'"`
          : ``;
        html +=
         `<div class="result-figure">` +
           `<img class="rf-img" src="${esc(f.webp)}"${srcset} alt="${esc(f.alt || '项目成效数据图')}"${wh} loading="eager" decoding="async" onload="this.classList.add('loaded')"${onErr}>` +
         `</div>`;
      } else if (r.figure && r.figure.src) {
        html +=
         `<div class="result-figure"><img class="rf-img" src="${esc(r.figure.src)}" alt="${esc(r.figure.alt || '项目成效数据图')}" loading="eager" decoding="async"></div>`;
      } else {
        html +=
         `<div class="result-figure"><div class="rf-placeholder">数据表现图占位（抖搜指数 / 趋势图 / 数据图表）</div></div>`;
      }
      html += `<div class="result-summary">${esc(r.summary || '')}</div>`;
    }
    wrap.innerHTML = html;
    return wrap;
  }

  /* ---------- 活动策划项目详情（三九×澳诺）：传播规划 / 传播物料 / 活动现场 ---------- */
  function buildEventDetail(c) {
    const detail = el('div', 'case-detail event-detail');

    /* 项目介绍（顶部整行，与其它项目同款标题与样式） */
    const intro = el('div', 'case-block event-intro');
    intro.innerHTML = `<h4>项目介绍</h4>
      <div class="outcome-card ${isPlaceholder(c.outcome) ? 'placeholder' : ''}">${esc(c.outcome || '项目介绍（待补充）')}</div>`;
    detail.appendChild(intro);

    const ev = c.event || {};

    /* 传播规划（整行，两张图左右并列、宽度一致） */
    const planBlk = el('div', 'case-block event-plan');
    planBlk.innerHTML = `<h4>传播规划</h4>`;
    const planRow = el('div', 'ev-row');
    (ev.plan || []).forEach((it) => planRow.appendChild(buildEventFigure(it)));
    planBlk.appendChild(planRow);
    detail.appendChild(planBlk);

    /* 底部两列：左=传播物料（两张竖图左右），右=活动现场（一张横图） */
    const bottom = el('div', 'event-bottom');
    const matBlk = el('div', 'case-block event-materials');
    matBlk.innerHTML = `<h4>传播物料</h4>`;
    const matRow = el('div', 'ev-row');
    (ev.materials || []).forEach((it) => matRow.appendChild(buildEventFigure(it)));
    matBlk.appendChild(matRow);
    bottom.appendChild(matBlk);

    const sceneBlk = el('div', 'case-block event-site');
    sceneBlk.innerHTML = `<h4>活动现场</h4>`;
    sceneBlk.appendChild(buildEventFigure(ev.site || { alt: '活动现场图片（占位，待替换）' }));
    bottom.appendChild(sceneBlk);

    detail.appendChild(bottom);

    return detail;
  }

  function buildEventFigure(it) {
    const fig = el('div', 'ev-figure');
    if (it && it.src) {
      const img = el('img');
      img.className = 'ev-img';
      img.alt = it.alt || '';
      img.loading = 'eager';        // 关键成果图同等处理：不依赖 lazy，首屏预加载已在后台完成
      img.decoding = 'async';
      if (it.w) img.width = it.w;
      if (it.h) img.height = it.h;
      if (it.webpSmall) {
        img.srcset = `${esc(it.webpSmall)} 600w, ${esc(it.src)} 1200w`;
        img.sizes = it.sizes || '(max-width: 768px) 320px, 400px';
      }
      img.src = it.src;             // 展示变体 == 预加载变体，切换时直接命中缓存
      if (it.fallback) {
        img.onerror = function () { this.onerror = null; this.src = it.fallback; };
      }
      img.onload = () => img.classList.add('loaded');
      if (img.complete) img.classList.add('loaded');
      fig.classList.add('ev-figure--filled');
      fig.appendChild(img);
      return fig;
    }
    fig.textContent = (it && it.alt) ? it.alt : '图片占位（待替换）';
    return fig;
  }

  /* ---------- 桌面端：左侧导航 + 右侧详情 ---------- */
  function renderCasesDesktop(area) {
    const layout = el('div', 'cases-layout');
    const nav = el('nav', 'brand-nav');
    caseGroups().forEach((g) => {
      const collapsed = groupCollapsed.has(g.name);
      const containsActive = g.items.some((c) => c.id === activeCaseId);

      const head = el('button', 'group-head' + (containsActive ? ' has-active' : ''));
      head.innerHTML = `<span>${esc(g.name)}</span><span class="chevron${collapsed ? ' closed' : ''}">▾</span>`;
      head.setAttribute('aria-expanded', String(!collapsed));
      head.addEventListener('click', () => {
        if (groupCollapsed.has(g.name)) groupCollapsed.delete(g.name);
        else groupCollapsed.add(g.name);
        renderContent();
      });
      nav.appendChild(head);

      const list = el('div', 'group-list' + (collapsed ? ' collapsed' : ''));
      g.items.forEach((c) => {
        const b = el('button', 'brand-item' + (c.id === activeCaseId ? ' active' : ''));
        b.innerHTML = `<span class="b-name">${esc(c.brand)}</span>${c.category ? `<span class="b-cat">${esc(c.category)}</span>` : ''}`;
        b.addEventListener('click', () => {
          if (activeCaseId === c.id) return;
          activeCaseId = c.id;
          activeMediaIdx = 0;
          renderContent();
        });
        list.appendChild(b);
      });
      nav.appendChild(list);
    });
    layout.appendChild(nav);

    const c = SITE_DATA.cases.find((x) => x.id === activeCaseId);
    layout.appendChild(buildCaseDetail(c));
    area.appendChild(layout);
  }

  /* ---------- 移动端：分组 + 项目就地展开 Accordion ---------- */
  function renderCasesMobile(area) {
    const wrap = el('div', 'cases-mobile');
    wrap.appendChild(el('p', 'case-hint', '点击对应项目即可展示'));

    caseGroups().forEach((g) => {
      const gEl = el('div', 'm-group');
      gEl.appendChild(el('div', 'm-group-title', esc(g.name)));
      g.items.forEach((c) => {
        const open = mobileOpenId === c.id;
        const item = el('div', 'm-case' + (open ? ' open' : ''));
        const head = el('button', 'm-case-head' + (open ? ' active' : ''));
        head.setAttribute('data-id', c.id);
        head.innerHTML = `<span class="m-case-main">
            <span class="b-name">${esc(c.brand)}</span>
            ${c.category ? `<span class="b-cat">${esc(c.category)}</span>` : ''}
          </span>
          <span class="m-chevron">${open ? '↑' : '↓'}</span>`;
        head.addEventListener('click', () => onMobileCaseClick(c, item, head, wrap));
        item.appendChild(head);
        if (open) {
          const detail = buildCaseDetail(c);
          detail.classList.add('m-detail');
          item.appendChild(detail);
          requestAnimationFrame(() => detail.classList.add('show'));
        }
        gEl.appendChild(item);
      });
      wrap.appendChild(gEl);
    });
    area.appendChild(wrap);
  }

  function onMobileCaseClick(c, item, head, wrap) {
    const id = c.id;
    if (mobileOpenId === id) {
      mobileOpenId = null;
      closeMobileDetail(item);
    } else {
      if (mobileOpenId) {
        const prev = wrap.querySelector('.m-case.open');
        if (prev) closeMobileDetail(prev);
      }
      mobileOpenId = id;
      activeCaseId = id;
      activeMediaIdx = 0;
      openMobileDetail(item, c);
    }
    updateMobileHeads(wrap);
    head.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function openMobileDetail(item, c) {
    item.classList.add('open');
    const detail = buildCaseDetail(c);
    detail.classList.add('m-detail');
    item.appendChild(detail);
    requestAnimationFrame(() => detail.classList.add('show'));
  }

  function closeMobileDetail(item) {
    item.classList.remove('open');
    const head = item.querySelector('.m-case-head');
    if (head) head.classList.remove('active');
    const detail = item.querySelector('.m-detail');
    if (!detail) return;
    detail.classList.remove('show');
    let removed = false;
    const remove = () => { if (!removed && detail.parentNode) { detail.remove(); removed = true; } };
    detail.addEventListener('transitionend', remove, { once: true });
    setTimeout(remove, 320);
  }

  function updateMobileHeads(wrap) {
    wrap.querySelectorAll('.m-case').forEach((m) => {
      const id = m.querySelector('.m-case-head').getAttribute('data-id');
      const open = id === mobileOpenId;
      m.classList.toggle('open', open);
      m.querySelector('.m-case-head').classList.toggle('active', open);
      m.querySelector('.m-chevron').textContent = open ? '↑' : '↓';
    });
  }

  function mediaIcon(type) {
    return { image: "🔺", video: "🎬", link: "🔗" }[type] || "📄";
  }

  function renderScreen(screen, m, c) {
    // ===== 0. 低清预览（LQIP）：真实图解码完成前先显示与内容一致的模糊预览，避免纯灰底/空白 =====
    // LQIP 文件与媒体图同名、后缀 .lqip.webp，随媒体图预加载完成而秒级出现；高清图加载后由绝对定位的
    // <img> 铺满覆盖，故预览层永不造成“只剩数据卡悬浮在空白手机上”。
    const _lqip = (m && m.type === "image")
      ? (m.lqip || (m.src && m.src.replace(/\.(webp|jpg|jpeg|png)$/i, ".lqip.webp")) || (m.fallback && m.fallback.replace(/\.(webp|jpg|jpeg|png)$/i, ".lqip.webp")))
      : null;
    screen.style.backgroundImage = _lqip
      ? `url("${esc(_lqip)}"), linear-gradient(160deg,#ECEEF2 0%,#E2E6EB 100%)`
      : "";

    // ===== 1. 媒体层（唯一节点，带 .screen-media 类，可交叉淡入）=====
    // 数据浮层不在此层内，避免交叉淡入时产生「双层卡片」。
    const fragment = document.createDocumentFragment();
    let primaryImg = null;

    const buildImage = () => {
      const pic = document.createElement("picture");
      pic.className = "screen-media";         // 媒体层唯一标记（供交叉淡入查找/移除）
      const img = el("img");
      img.alt = m.label || "";
      img.decoding = "async";
      img.loading = "eager";                   // 当前激活图优先加载（首屏/切换均即时，不延迟）
      img.setAttribute("fetchpriority", "high");
      if (m.fallback) {
        const source = document.createElement("source");
        source.type = "image/webp";
        source.srcset = m.srcset || m.src;    // 响应式：320w / 480w，浏览器按设备只取所需
        if (m.sizes) source.sizes = m.sizes;
        pic.appendChild(source);
        img.src = m.fallback;
      } else {
        img.src = m.src;
      }
      img.style.cursor = m.link ? "pointer" : "default";
      if (m.link) img.addEventListener("click", () => window.open(m.link, "_blank", "noopener"));
      pic.appendChild(img);
      fragment.appendChild(pic);
      primaryImg = img;
    };

    if (!m || !m.src) {
      const ph = placeholderNode(mediaIcon(m ? m.type : "image"), (m && (m.note || m.label)) || "内容待补充");
      ph.classList.add("screen-media");
      fragment.appendChild(ph);
    } else if (m.type === "image") {
      buildImage();
    } else if (m.type === "video") {
      const v = el("video");
      v.className = "screen-media";
      v.src = m.src; v.controls = true; v.playsInline = true;
      fragment.appendChild(v);
    } else if (m.type === "link") {
      const ph = placeholderNode("🔗", m.label);
      ph.classList.add("screen-media");
      const a = el("a", "action-btn", "打开链接 ↗");
      a.href = m.src; a.target = "_blank"; a.rel = "noopener"; a.style.marginTop = "6px";
      ph.appendChild(a);
      fragment.appendChild(ph);
    }

    const newMedia = fragment.firstChild;       // 媒体节点（picture / video / 占位 div）

    // 交叉淡入：仅媒体层参与，旧媒体层保留至新图加载完成再移除（解决切换黑屏/白屏）
    const oldMedia = screen.querySelector(".screen-media");
    const hasOld = !!oldMedia;
    if (oldMedia) {
      oldMedia.style.position = "absolute"; oldMedia.style.inset = "0";
      oldMedia.style.width = "100%"; oldMedia.style.height = "100%";
    }
    newMedia.style.position = "absolute"; newMedia.style.inset = "0";
    newMedia.style.width = "100%"; newMedia.style.height = "100%";
    if (hasOld) { newMedia.style.opacity = "0"; newMedia.style.transition = "opacity .22s ease"; }
    screen.appendChild(newMedia);

    const commit = () => {
      newMedia.style.opacity = "1";
      setTimeout(() => {
        if (oldMedia && oldMedia.parentNode) oldMedia.parentNode.removeChild(oldMedia);
      }, 260);
    };
    const rollback = () => {
      // 新图加载失败：保留旧媒体层，移除新内容（不黑屏）
      if (newMedia.parentNode) newMedia.parentNode.removeChild(newMedia);
    };

    if (primaryImg) {
      if (primaryImg.complete && primaryImg.naturalWidth > 0) commit();
      else {
        primaryImg.addEventListener("load", commit, { once: true });
        primaryImg.addEventListener("error", rollback, { once: true });
      }
    } else {
      commit(); // 占位/视频/链接：直接提交并移除旧媒体层
    }

    // ===== 2. 数据浮层（唯一常驻节点，直接更新文字，不交叉淡入）=====
    // 始终固定在手机右上角；当前案例/媒体无数据卡时移除该唯一节点，绝不重复创建。
    const o = m.overlay || c.screenOverlay;
    let overlay = screen.querySelector(".screen-overlay");
    if (!o) {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); // 隐藏唯一节点
      return;
    }
    if (!overlay) {
      overlay = el("div", "screen-overlay");
      screen.appendChild(overlay);              // 整个 screen 生命周期内最多一个浮层节点
    }
    if (Array.isArray(o.rows)) {
      overlay.innerHTML = o.rows.map(r =>
        `<div class="so-row"><span class="so-k">${esc(r.k)}</span><span class="so-v">${esc(r.v)}</span></div>`).join("");
    } else {
      const lbl = o.labels || {};
      overlay.innerHTML =
        `<div class="so-row"><span class="so-k">曝光量</span><span class="so-v">${esc(o.exposure)}</span></div>` +
        `<div class="so-row"><span class="so-k">互动量</span><span class="so-v">${esc(o.likes)}</span></div>` +
        `<div class="so-row"><span class="so-k">${esc(lbl.cpm || "CPM")}</span><span class="so-v">${esc(o.cpm)}</span></div>` +
        `<div class="so-row"><span class="so-k">${esc(lbl.cpe || "CPE")}</span><span class="so-v">${esc(o.cpe)}</span></div>`;
    }
  }

  function placeholderNode(icon, label) {
    const ph = el("div", "screen-placeholder");
    ph.innerHTML = `<div class="ph-icon">${icon}</div><div class="ph-label">${esc(label)}</div><div>素材上传后将自动展示</div>`;
    return ph;
  }

  /* =========================================================
   * 专业能力
   * ========================================================= */
  function renderSkills(area) {
    sectionHead(area, "专业能力", "Skills");
    SITE_DATA.skills.forEach((g) => {
      const grp = el("div", "skill-group");
      grp.innerHTML = `<h3>${esc(g.group)}</h3>`;
      const wrap = el("div", "capsules");
      g.items.forEach((s) => wrap.appendChild(el("span", "capsule", esc(s))));
      grp.appendChild(wrap);
      area.appendChild(grp);
    });
  }

  /* =========================================================
   * 联系我
   * ========================================================= */
  function renderContact(area) {
    sectionHead(area, "联系我", "Contact");
    const wrap = el("div", "contact-wrap");
    wrap.appendChild(el("p", "contact-lead",
      "如果您对我的经历感兴趣<br>欢迎与我沟通交流😊"));
    const grid = el("div", "contact-grid");
    CONTACT_DEFS.forEach((d) => {
      const card = el("button", d.key === "resume" ? "contact-card contact-card--wide" : "contact-card");
      card.innerHTML = `<span class="c-icon">${d.icon}</span><span class="c-label">${esc(d.label)}</span><span class="c-sub">${esc(d.sub)}</span>`;
      if (d.key === "resume") pressFeedback(card, () => contactActions.resume(SITE_DATA.profile.contacts));
      else card.addEventListener("click", () => contactActions[d.key](SITE_DATA.profile.contacts));
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    area.appendChild(wrap);
  }

  /* ---------- 启动 ---------- */
  renderProfile();
  renderTabs();
  renderContent();
  prefetchResume(); // 首屏即开始预热简历预览页资源（浏览器 idle 时拉取）

  /* 视口跨越 768px 时重建案例模块（桌面左右布局 / 移动 Accordion 切换） */
  const mqCases = window.matchMedia('(max-width: 768px)');
  const onWidthChange = () => { if (activeTab === 'cases') renderContent(); };
  if (mqCases.addEventListener) mqCases.addEventListener('change', onWidthChange);
  else if (mqCases.addListener) mqCases.addListener(onWidthChange);

  /* 关键成果图预加载：页面初始化后立即在后台下载并 decode，
     切换项目时直接命中浏览器缓存（同一 URL），不再展开后才请求或重新解码。
     仅针对带 results.figure.webp 的成果图（东阿阿胶 / 小青盒）。 */
  const _figureReady = new Map(); // url -> Promise<HTMLImageElement|null>
  function preloadFigure(url) {
    if (!url || _figureReady.has(url)) return _figureReady.get(url);
    const p = new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      const done = () => resolve(img);
      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done); // 解码失败也放行，退化为 onload 显示
      } else {
        img.onload = done;
        img.onerror = () => resolve(null);
      }
    });
    _figureReady.set(url, p);
    return p;
  }
  SITE_DATA.cases.forEach((c) => {
    if (c && c.results && c.results.figure && c.results.figure.webp) {
      preloadFigure(c.results.figure.webp); // 立即发起，不等空闲
      if (c.results.figure.webpSmall) preloadFigure(c.results.figure.webpSmall);
    }
  });

  /* 三九×澳诺 活动详情图 + 武志红 矩阵平台截图：页面初始化后立即后台下载并 decode，
     切换项目时直接命中浏览器缓存（同一 URL），不再展开后才请求或重新解码。 */
  SITE_DATA.cases.forEach((c) => {
    if (!c) return;
    if (c.id === 'aonuo' && c.event) {
      const ev = c.event;
      (ev.plan || []).concat(ev.materials || []).forEach((it) => {
        if (it && it.src) { preloadFigure(it.src); if (it.webpSmall) preloadFigure(it.webpSmall); }
      });
      if (ev.site && ev.site.src) { preloadFigure(ev.site.src); if (ev.site.webpSmall) preloadFigure(ev.site.webpSmall); }
    }
    if (c.id === 'wuzhihong' && c.matrix) {
      (c.matrix || []).forEach((cell) => {
        const m = (cell && cell.media) || {};
        if (m.src) preloadFigure(m.src);
      });
    }
  });

  /* 提前预取简历预览页所需资源（HTML + 预览图）：
     用户滚动到联系方式附近或点击「查看简历」前即开始准备，跳转瞬时完成；
     预览图已预取，进入即秒显，无需 PDF.js。 */
  function prefetchResume() {
    const urls = [
      "resume/",
      "resume/resume-preview-399e8e64.webp"
    ];
    urls.forEach((u) => {
      if (document.querySelector(`link[rel="prefetch"][href="${u}"]`)) return; // 去重
      const l = document.createElement("link");
      l.rel = "prefetch";
      l.href = u;
      l.as = u.endsWith(".mjs") ? "script" : (u.endsWith(".pdf") ? "fetch" : "document");
      if (u.endsWith(".pdf")) l.crossOrigin = "anonymous";
      document.head.appendChild(l);
    });
  }

  /* 首屏渲染完成后，利用浏览器空闲时间预加载各案例首图，使切换案例时秒开；
     不阻塞首屏（首屏仅加载当前案例图，不一次性加载全部案例图片） */
  const preloadIdle = () => {
    // 首屏稳定后，后台预加载所有案例的全部手机图片，切换时直接命中缓存、无白屏
    SITE_DATA.cases.forEach((c) => {
      (c.media || []).forEach((m) => {
        if (m && m.type === "image" && m.src) { const i = new Image(); i.src = m.src; }
      });
    });
  };
  if ("requestIdleCallback" in window) window.requestIdleCallback(preloadIdle, { timeout: 4000 });
  else setTimeout(preloadIdle, 1500);
})();

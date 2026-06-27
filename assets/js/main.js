/* ════════════════════════════════════════════════
   SOMI-TECH — main.js
   The thin line between YOU & TECH
════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─────────────────────────────────────
     LOADER
  ───────────────────────────────────── */
  var loader    = document.getElementById("loader");
  var loaderBar = document.getElementById("loaderBar");
  var loaderPct = document.getElementById("loaderPct");
  var loaderVal = 0;

  var loaderInt = setInterval(function () {
    loaderVal += Math.random() * 18 + 6;
    if (loaderVal >= 100) {
      loaderVal = 100;
      clearInterval(loaderInt);
      loaderBar.style.width = "100%";
      loaderPct.textContent = "100%";
      setTimeout(function () {
        loader.classList.add("done");
        setTimeout(function () {
          loader.style.display = "none";
        }, 750);
      }, 280);
    } else {
      loaderBar.style.width = loaderVal.toFixed(0) + "%";
      loaderPct.textContent = loaderVal.toFixed(0) + "%";
    }
  }, 80);

  /* ─────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────── */
  var cur  = document.getElementById("cur");
  var ring = document.getElementById("cur-ring");

  if (window.matchMedia("(pointer: fine)").matches && cur && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top  = my + "px";
    });

    (function tick() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      requestAnimationFrame(tick);
    })();

    var hoverEls = document.querySelectorAll(
      "a, button, .svc-card, .g-item, .tag, .m-photo, " +
      ".skill-icon-card, .social-card, .ts-pill, .team-card, " +
      ".tc-culture-badge, .team-stat-box, .mono-svc-tag, .poem-card"
    );
    hoverEls.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        document.body.classList.add("cur-hover");
      });
      el.addEventListener("mouseleave", function () {
        document.body.classList.remove("cur-hover");
      });
    });
  }

  /* ─────────────────────────────────────
     NAVBAR SCROLL
  ───────────────────────────────────── */
  var nav = document.getElementById("nav");

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    updateActiveLink();
    toggleBtt();
  }, { passive: true });

  /* ─────────────────────────────────────
     ACTIVE NAV LINK
  ───────────────────────────────────── */
  var sections   = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    var current = "";
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 160) {
        current = s.id;
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  /* ─────────────────────────────────────
     MOBILE DRAWER
  ───────────────────────────────────── */
  var burger  = document.getElementById("burger");
  var drawer  = document.getElementById("drawer");
  var overlay = document.getElementById("overlay");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    burger.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    burger.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (burger) {
    burger.addEventListener("click", function () {
      drawer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
  }
  if (overlay) overlay.addEventListener("click", closeDrawer);

  document.querySelectorAll(".dlink").forEach(function (l) {
    l.addEventListener("click", closeDrawer);
  });

  /* ─────────────────────────────────────
     KEYBOARD — ESC CLOSES DRAWER
  ───────────────────────────────────── */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  /* ─────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ─────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────── */
  var revEls = document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-s");

  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });

  revEls.forEach(function (el, i) {
    el.style.transitionDelay = (i % 7) * 0.065 + "s";
    revObs.observe(el);
  });

  /* ─────────────────────────────────────
     COUNTER ANIMATION
  ───────────────────────────────────── */
  function animateCounters(container) {
    var statEls = container
      ? container.querySelectorAll("[data-target]")
      : document.querySelectorAll(".sn[data-target]");

    statEls.forEach(function (el) {
      var target = +el.dataset.target;
      var sfx    = el.dataset.sfx || "";
      var start  = null;
      var dur    = 1700;

      var step = function (ts) {
        if (!start) start = ts;
        var p    = Math.min((ts - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target) + sfx;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* About stats counter */
  var statsRow = document.querySelector(".stats-row");
  if (statsRow) {
    var counterObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters(statsRow);
        counterObs.disconnect();
      }
    }, { threshold: 0.5 });
    counterObs.observe(statsRow);
  }

  /* Team stats counter */
  var teamStats = document.querySelector(".team-stats");
  if (teamStats) {
    var teamCounterObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters(teamStats);
        teamCounterObs.disconnect();
      }
    }, { threshold: 0.4 });
    teamCounterObs.observe(teamStats);
  }

  /* ─────────────────────────────────────
     SKILL BARS
  ───────────────────────────────────── */
  function animateSkillBars(container) {
    var bars = container
      ? container.querySelectorAll(".skill-bar-fill")
      : document.querySelectorAll(".skill-bar-fill");

    bars.forEach(function (bar) {
      var pct = bar.dataset.pct;
      setTimeout(function () {
        bar.style.width = pct + "%";
      }, 80);
    });
  }

  /* ─────────────────────────────────────
     SKILL TABS
  ───────────────────────────────────── */
  var skillTabs   = document.querySelectorAll(".skill-tab");
  var skillPanels = document.querySelectorAll(".skills-panel");

  skillTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var panelId = "panel-" + tab.dataset.panel;

      skillTabs.forEach(function (t)   { t.classList.remove("active"); });
      skillPanels.forEach(function (p) { p.classList.remove("active"); });

      tab.classList.add("active");

      var panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add("active");
        panel.querySelectorAll(".skill-bar-fill").forEach(function (b) {
          b.style.width = "0%";
        });
        animateSkillBars(panel);
      }
    });
  });

  /* Animate skill bars when skills section enters view */
  var skillSection = document.getElementById("skills");
  if (skillSection) {
    var skillObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var activePanel = document.querySelector(".skills-panel.active");
        if (activePanel) animateSkillBars(activePanel);
        skillObs.disconnect();
      }
    }, { threshold: 0.2 });
    skillObs.observe(skillSection);
  }

  /* ─────────────────────────────────────
     TEAM CARDS — 3D TILT (desktop only)
  ───────────────────────────────────── */
  if (window.matchMedia("(pointer: fine)").matches) {

    document.querySelectorAll(".team-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
        var y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
        card.style.transform =
          "perspective(800px) rotateX(" + y + "deg) rotateY(" + x + "deg) translateZ(6px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });

    /* Service cards tilt */
    document.querySelectorAll(".svc-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
        var y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
        card.style.transform =
          "perspective(700px) rotateX(" + y + "deg) rotateY(" + x + "deg) translateZ(4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ─────────────────────────────────────
     TEAM CARDS — STAGGER REVEAL
  ───────────────────────────────────── */
  var teamCards = document.querySelectorAll(".team-card");

  var tcObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "none";
        tcObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  teamCards.forEach(function (card, i) {
    card.style.opacity   = "0";
    card.style.transform = "translateY(32px) scale(0.97)";
    card.style.transition =
      "opacity .65s " + (i * 0.1) + "s ease, " +
      "transform .65s " + (i * 0.1) + "s cubic-bezier(.25,.46,.45,.94), " +
      "border-color .4s, box-shadow .4s";
    tcObs.observe(card);
  });

  /* ─────────────────────────────────────
     HERO IMAGE CROSSFADE
  ───────────────────────────────────── */
  var heroBg   = document.getElementById("heroBg");
  var heroImgs = [
    "assets/images/pics1.jpeg",
    "assets/images/pics2.jpeg",
    "assets/images/pics4.jpeg"
  ];

  if (heroBg) {
    heroBg.addEventListener("load", function () {
      heroBg.classList.add("loaded");
    });
    if (heroBg.complete) heroBg.classList.add("loaded");

    var idx = 0;
    setInterval(function () {
      heroBg.style.transition = "opacity .6s ease";
      heroBg.style.opacity    = "0";
      setTimeout(function () {
        idx = (idx + 1) % heroImgs.length;
        heroBg.src = heroImgs[idx];
        heroBg.onload = function () {
          heroBg.style.opacity = "1";
        };
      }, 620);
    }, 5200);
  }

  /* ─────────────────────────────────────
     BACK TO TOP
  ───────────────────────────────────── */
  var btt = document.getElementById("btt");

  function toggleBtt() {
    if (btt) btt.classList.toggle("show", window.scrollY > 500);
  }

  if (btt) {
    btt.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ─────────────────────────────────────
     LAZY IMAGE FADE-IN
  ───────────────────────────────────── */
  document.querySelectorAll("img[loading='lazy']").forEach(function (img) {
    img.style.opacity    = "0";
    img.style.transition = "opacity .5s ease";
    img.addEventListener("load", function () {
      img.style.opacity = "1";
    });
    if (img.complete) img.style.opacity = "1";
  });

  /* ─────────────────────────────────────
     GALLERY ITEM STAGGER
  ───────────────────────────────────── */
  var galItems = document.querySelectorAll(".g-item");

  var galObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "none";
        }, i * 80);
        galObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galItems.forEach(function (item) {
    item.style.opacity   = "0";
    item.style.transform = "translateY(18px)";
    item.style.transition = "opacity .55s ease, transform .55s ease";
    galObs.observe(item);
  });

  /* ─────────────────────────────────────
     SOCIAL CARD STAGGER
  ───────────────────────────────────── */
  var socCards = document.querySelectorAll(".social-card");

  var socObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "none";
        socObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  socCards.forEach(function (card, i) {
    card.style.opacity   = "0";
    card.style.transform = "translateY(16px)";
    card.style.transition =
      "opacity .5s " + (i * 0.06) + "s ease, " +
      "transform .5s " + (i * 0.06) + "s ease, " +
      "border-color .3s, background .3s, box-shadow .3s";
    socObs.observe(card);
  });

  /* ─────────────────────────────────────
     PROCESS STEP STAGGER
  ───────────────────────────────────── */
  var psSteps = document.querySelectorAll(".process-step");

  var psObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "none";
        psObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  psSteps.forEach(function (step, i) {
    step.style.opacity   = "0";
    step.style.transform = "translateY(20px)";
    step.style.transition =
      "opacity .6s " + (i * 0.12) + "s ease, " +
      "transform .6s " + (i * 0.12) + "s ease, background .3s";
    psObs.observe(step);
  });

  /* ─────────────────────────────────────
     MONOGAMIST SERVICE TAGS — STAGGER
  ───────────────────────────────────── */
  var monoSection = document.getElementById("monogamist");
  if (monoSection) {
    var monoObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        document.querySelectorAll(".mono-svc-tag").forEach(function (tag, i) {
          setTimeout(function () {
            tag.style.opacity   = "1";
            tag.style.transform = "none";
          }, i * 80);
        });
        monoObs.disconnect();
      }
    }, { threshold: 0.2 });

    document.querySelectorAll(".mono-svc-tag").forEach(function (tag) {
      tag.style.opacity   = "0";
      tag.style.transform = "translateY(10px)";
      tag.style.transition = "opacity .4s ease, transform .4s ease, background .25s, border-color .25s, color .25s";
    });

    monoObs.observe(monoSection);
  }

  /* ─────────────────────────────────────
     POEM CARD — SCROLL REVEAL ANIMATION
  ───────────────────────────────────── */
  var poemCard = document.querySelector(".poem-card");
  if (poemCard) {
    var poemObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        poemCard.style.opacity   = "1";
        poemCard.style.transform = "none";
        poemObs.disconnect();
      }
    }, { threshold: 0.1 });

    poemCard.style.opacity   = "0";
    poemCard.style.transform = "translateY(24px)";
    poemCard.style.transition = "opacity .8s ease, transform .8s ease";
    poemObs.observe(poemCard);
  }

  /* ─────────────────────────────────────
     CONTACT FORM → WHATSAPP
  ───────────────────────────────────── */
  var sendBtn = document.getElementById("sendBtn");
  var fOk     = document.getElementById("fOk");

  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      var name    = (document.getElementById("fname")?.value    || "").trim();
      var contact = (document.getElementById("femail")?.value   || "").trim();
      var service = (document.getElementById("fservice")?.value || "").trim();
      var budget  = (document.getElementById("fbudget")?.value  || "").trim();
      var msg     = (document.getElementById("fmsg")?.value     || "").trim();

      if (!name || !contact || !msg) {
        var orig = sendBtn.textContent;
        sendBtn.textContent       = "Please fill all required fields ✕";
        sendBtn.style.background  = "#8B2500";
        setTimeout(function () {
          sendBtn.textContent      = orig;
          sendBtn.style.background = "";
        }, 2400);
        return;
      }

      var text = encodeURIComponent(
        "*New Enquiry — SOMI-TECH*\n\n" +
        "👤 *Name:* "    + name                        + "\n" +
        "📞 *Contact:* " + contact                     + "\n" +
        "🔧 *Service:* " + (service || "Not specified") + "\n" +
        "💰 *Budget:* "  + (budget  || "Not specified") + "\n\n" +
        "💬 *Message:*\n" + msg
      );

      sendBtn.textContent = "Opening WhatsApp…";

      setTimeout(function () {
        window.open("https://wa.me/2347083026746?text=" + text, "_blank");

        if (fOk) {
          fOk.classList.add("show");
          setTimeout(function () { fOk.classList.remove("show"); }, 6000);
        }

        sendBtn.textContent = "Send via WhatsApp →";

        ["fname", "femail", "fmsg"].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = "";
        });

        var srv = document.getElementById("fservice");
        var bgt = document.getElementById("fbudget");
        if (srv) srv.selectedIndex = 0;
        if (bgt) bgt.selectedIndex = 0;
      }, 600);
    });
  }

  /* ─────────────────────────────────────
     CONSOLE BRANDING
  ───────────────────────────────────── */
  console.log(
    "%cSOMI-TECH ⚡",
    "color:#e8a832;font-size:1.6rem;font-weight:800;font-family:'Courier New',monospace;letter-spacing:.05em;"
  );
  console.log(
    "%cThe thin line between YOU & TECH",
    "color:#6b6255;font-size:.9rem;font-family:'Courier New',monospace;"
  );
  console.log(
    "%cBuilt by Somina Oje | Port Harcourt, Nigeria 🇳🇬",
    "color:#c9891c;font-size:.8rem;font-family:'Courier New',monospace;"
  );
  console.log(
    "%c⚡ WhatsApp: +234 708 302 6746",
    "color:#25D366;font-size:.8rem;font-family:'Courier New',monospace;"
  );

})();
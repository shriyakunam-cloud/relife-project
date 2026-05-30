// ── Register GSAP plugins ────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── Helpers ──────────────────────────────────────────────────────────────────
const ease = "power3.out";
const spring = "elastic.out(1, 0.6)";

function fromTo(targets, from, to, extra = {}) {
  gsap.fromTo(targets, from, { ...to, ...extra });
}

// ── Navbar scroll effect ─────────────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ──────────────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
mobileMenu.querySelectorAll("a").forEach(l => l.addEventListener("click", () => mobileMenu.classList.remove("open")));

// ── Hero entrance (plays immediately on load) ────────────────────────────────
const heroTl = gsap.timeline({ defaults: { ease } });
heroTl
  .fromTo(".hero-content h1",
    { opacity: 0, y: 70 },
    { opacity: 1, y: 0, duration: 1 })
  .fromTo(".hero-sub",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
  .fromTo(".hero-actions .btn",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.5")
  .fromTo(".hero-scroll-hint",
    { opacity: 0 },
    { opacity: 1, duration: 0.6 }, "-=0.3");

// ── Scroll parallax on hero bg ───────────────────────────────────────────────
gsap.to(".hero-bg", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// ── Reusable scroll-triggered fade-up ────────────────────────────────────────
function fadeUp(targets, trigger, options = {}) {
  gsap.fromTo(targets,
    { opacity: 0, y: options.y ?? 60 },
    {
      opacity: 1, y: 0,
      duration: options.duration ?? 0.75,
      stagger: options.stagger ?? 0,
      ease: options.ease ?? ease,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

function fadeLeft(targets, trigger, options = {}) {
  gsap.fromTo(targets,
    { opacity: 0, x: options.x ?? -50 },
    {
      opacity: 1, x: 0,
      duration: options.duration ?? 0.75,
      stagger: options.stagger ?? 0.1,
      ease,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

function fadeRight(targets, trigger, options = {}) {
  gsap.fromTo(targets,
    { opacity: 0, x: options.x ?? 50 },
    {
      opacity: 1, x: 0,
      duration: options.duration ?? 0.75,
      stagger: options.stagger ?? 0.1,
      ease,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

// ── Stats counter ─────────────────────────────────────────────────────────────
ScrollTrigger.create({
  trigger: "#stats",
  start: "top 80%",
  onEnter: () => {
    fadeUp(".stat-card", "#stats", { stagger: 0.1, y: 40 });

    // Animate numbers
    const targets = [
      { el: document.querySelectorAll(".stat-num")[0], end: 3, suffix: "+" },
      { el: document.querySelectorAll(".stat-num")[1], end: 100, suffix: "%" },
      { el: document.querySelectorAll(".stat-num")[3], end: 1, suffix: "" },
    ];
    targets.forEach(({ el, end, suffix }) => {
      if (!el) return;
      gsap.fromTo({ val: 0 }, { val: end }, {
        duration: 1.6,
        delay: 0.4,
        ease: "power2.out",
        onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; },
      });
    });
  },
  once: true,
});

// ── About ────────────────────────────────────────────────────────────────────
fadeUp(".about-card", "#about", { stagger: 0.15, y: 50 });
fadeLeft(".about-text .section-label, .about-text h2, .about-text p, .about-text .btn", "#about", { stagger: 0.1 });

// ── Values ───────────────────────────────────────────────────────────────────
gsap.fromTo(".values-grid .section-label, .values-grid ~ *, #values .section-header",
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0, duration: 0.7, ease,
    scrollTrigger: { trigger: "#values", start: "top 85%" },
  }
);
gsap.fromTo(".value-card",
  { opacity: 0, y: 70, scale: 0.95 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.7, stagger: 0.12, ease,
    scrollTrigger: { trigger: "#values", start: "top 80%" },
  }
);

// ── Section headers (reusable) ────────────────────────────────────────────────
["#initiatives", "#how", "#why", "#involve"].forEach(id => {
  gsap.fromTo(`${id} .section-header`,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.7, ease,
      scrollTrigger: { trigger: id, start: "top 85%" },
    }
  );
});

// ── Initiatives ───────────────────────────────────────────────────────────────
gsap.fromTo(".initiative-card",
  { opacity: 0, y: 80, scale: 0.96 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.8, stagger: 0.18, ease,
    scrollTrigger: { trigger: "#initiatives .initiatives-grid", start: "top 82%" },
  }
);

// ── How it works ──────────────────────────────────────────────────────────────
gsap.fromTo(".how-step",
  { opacity: 0, y: 60 },
  {
    opacity: 1, y: 0,
    duration: 0.7, stagger: 0.15, ease,
    scrollTrigger: { trigger: "#how .how-grid", start: "top 82%" },
  }
);
gsap.fromTo(".how-arrow",
  { opacity: 0, x: -15 },
  {
    opacity: 1, x: 0,
    duration: 0.5, stagger: 0.15, delay: 0.3, ease,
    scrollTrigger: { trigger: "#how .how-grid", start: "top 82%" },
  }
);

// ── Mission banner ────────────────────────────────────────────────────────────
gsap.fromTo("#mission-banner blockquote",
  { opacity: 0, y: 50, scale: 0.97 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1, ease,
    scrollTrigger: { trigger: "#mission-banner", start: "top 80%" },
  }
);
gsap.fromTo("#mission-banner p",
  { opacity: 0 },
  {
    opacity: 1, duration: 0.6, delay: 0.4, ease,
    scrollTrigger: { trigger: "#mission-banner", start: "top 80%" },
  }
);

// ── Green Room ────────────────────────────────────────────────────────────────
fadeLeft(".greenroom-text > *", "#greenroom", { stagger: 0.1 });
fadeRight(".gr-card", "#greenroom");

// ── Why it matters ────────────────────────────────────────────────────────────
gsap.fromTo(".why-card",
  { opacity: 0, y: 55 },
  {
    opacity: 1, y: 0,
    duration: 0.7, stagger: 0.1, ease,
    scrollTrigger: { trigger: "#why .why-grid", start: "top 83%" },
  }
);

// ── Get involved cards ────────────────────────────────────────────────────────
gsap.fromTo(".involve-card",
  { opacity: 0, y: 65, scale: 0.95 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.75, stagger: 0.13, ease,
    scrollTrigger: { trigger: "#involve .involve-grid", start: "top 83%" },
  }
);

// ── Contact ───────────────────────────────────────────────────────────────────
fadeLeft(".contact-text > *", "#contact", { stagger: 0.1 });
gsap.fromTo(".contact-form",
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0, duration: 0.8, ease,
    scrollTrigger: { trigger: "#contact", start: "top 83%" },
  }
);

// ── Hover pop on cards ────────────────────────────────────────────────────────
function hoverPop(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener("mouseenter", () =>
      gsap.to(el, { scale: 1.04, duration: 0.25, ease: "back.out(2)" }));
    el.addEventListener("mouseleave", () =>
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" }));
  });
}

hoverPop(".value-card");
hoverPop(".why-card");
hoverPop(".involve-card");
hoverPop(".how-step");
hoverPop(".about-card");
hoverPop(".initiative-card");

// ── Button press effect ───────────────────────────────────────────────────────
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousedown", () =>
    gsap.to(btn, { scale: 0.94, duration: 0.1, ease: "power2.out" }));
  btn.addEventListener("mouseup", () =>
    gsap.to(btn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }));
  btn.addEventListener("mouseleave", () =>
    gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" }));
});

// ── Floating cards in About ───────────────────────────────────────────────────
gsap.to(".card-1", { y: -12, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
gsap.to(".card-2", { y: 10, duration: 3,   ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });
gsap.to(".card-3", { y: -8, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });

// ── Green Room wave pulse ─────────────────────────────────────────────────────
document.querySelectorAll(".wave").forEach((wave, i) => {
  gsap.to(wave, {
    scaleY: 0.3 + Math.random() * 0.4,
    duration: 0.4 + i * 0.1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: i * 0.12,
  });
});

// ── Contact form (Formspree AJAX) ─────────────────────────────────────────────
const contactForm = document.getElementById("contactForm");
const submitBtn   = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Mirror email into _replyto hidden field
  document.getElementById("replyto").value = this.email.value.trim();

  // Button loading state
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;
  gsap.to(submitBtn, { scale: 0.97, duration: 0.15 });

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Success!
      gsap.to(submitBtn, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
      submitBtn.style.display = "none";
      formSuccess.style.display = "block";
      gsap.fromTo(formSuccess, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      contactForm.reset();
    } else {
      throw new Error("Server error");
    }
  } catch {
    submitBtn.textContent = "Something went wrong — email us directly!";
    submitBtn.disabled = false;
    submitBtn.style.background = "#c0392b";
    gsap.to(submitBtn, { scale: 1, duration: 0.3 });
  }
});

/* Memory Box — optimized */
document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    loveStart: new Date("2026-07-31T00:00:00"),
    particles: true,
  };

  const memories = [
    {
      image: "images/1.jpg",
      title: "First Meeting",
      text: "The beginning of everything ❤️",
    },
    {
      image: "images/2.jpg",
      title: "Beautiful Days",
      text: "Days that felt like a dream 🌸",
    },
    {
      image: "images/3.jpg",
      title: "Forever",
      text: "Our memories will never fade ✨",
    },
  ];

  /* ---------- Music ---------- */
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  let musicOn = false;

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (!musicOn) {
          await bgMusic.play();
          musicOn = true;
          musicBtn.classList.add("playing");
        } else {
          bgMusic.pause();
          musicOn = false;
          musicBtn.classList.remove("playing");
        }
      } catch {
        /* autoplay blocked — user gesture needed */
      }
    });
  }

  /* ---------- Open Box button (hero) ---------- */
  const openBoxBtn = document.getElementById("openBox");
  const memoryBox = document.getElementById("memoryBox");

  openBoxBtn?.addEventListener("click", () => {
    document.getElementById("scene")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => openGift(), 700);
  });

  function openGift() {
    if (!memoryBox || memoryBox.classList.contains("open")) return;
    memoryBox.classList.add("open");
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#ff6b9d", "#ff8fab", "#ffd6a5", "#ffffff"],
      });
    }
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  }

  memoryBox?.addEventListener("click", openGift);

  /* ---------- Gallery + Viewer ---------- */
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerTitle = document.getElementById("viewerTitle");
  const viewerText = document.getElementById("viewerText");
  const closeViewer = document.getElementById("closeViewer");

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = +card.dataset.id;
      const m = memories[id];
      if (!m || !viewer) return;
      viewerImg.src = m.image;
      viewerImg.alt = m.title;
      viewerTitle.textContent = m.title;
      viewerText.textContent = m.text;
      viewer.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeView() {
    if (!viewer) return;
    viewer.hidden = true;
    document.body.style.overflow = "";
  }
  closeViewer?.addEventListener("click", closeView);
  viewer?.querySelector(".viewer-backdrop")?.addEventListener("click", closeView);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeView();
  });

  /* ---------- Envelope ---------- */
  const envelope = document.getElementById("envelope");
  envelope?.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });

  /* ---------- Love counter ---------- */
  function updateCounter() {
    const now = Date.now();
    let diff = now - CONFIG.loveStart.getTime();
    if (diff < 0) diff = 0;

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    const el = (id, v) => {
      const n = document.getElementById(id);
      if (n) n.textContent = String(v).padStart(2, "0");
    };
    el("days", days);
    el("hours", hours);
    el("minutes", minutes);
    el("seconds", seconds);
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  /* ---------- Surprise / Final ---------- */
  const surpriseBtn = document.getElementById("surprise");
  const finalSec = document.getElementById("final");
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");

  surpriseBtn?.addEventListener("click", () => {
    if (!finalSec) return;
    finalSec.hidden = false;
    document.body.style.overflow = "hidden";
    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#ff6b9d", "#ff8fab", "#ffd6a5", "#ffffff", "#ff9eb5"],
      });
    }
  });

  yesBtn?.addEventListener("click", () => {
    if (typeof confetti === "function") {
      const end = Date.now() + 2500;
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff6b9d", "#ffd6a5"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff8fab", "#ffffff"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
    yesBtn.textContent = "❤️ Forever & Always";
    yesBtn.disabled = true;
    if (noBtn) noBtn.style.display = "none";
  });

  /* Runaway No button */
  noBtn?.addEventListener("mouseenter", moveNo);
  noBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    moveNo();
  });

  function moveNo() {
    if (!noBtn) return;
    const pad = 40;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;
    const x = Math.random() * maxX + pad / 2;
    const y = Math.random() * maxY + pad / 2;
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "300";
  }

  /* ---------- Light particles ---------- */
  if (CONFIG.particles) {
    const canvas = document.getElementById("particles");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let w, h, particles = [];

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener("resize", resize);

      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * -0.4 - 0.1,
          a: Math.random() * 0.4 + 0.1,
        });
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 180, 200, ${p.a})`;
          ctx.fill();
        }
        requestAnimationFrame(draw);
      }
      draw();
    }
  }

  /* Optional GSAP entrance */
  if (typeof gsap !== "undefined") {
    gsap.from(".hero-inner > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });
  }
});

// --- EFFET DE TEXTE QUI S'ÉCRIT (TYPING EFFECT) --- //
const text = "Bienvenue sur mon portfolio Cybersécurité – Brice Almeras_";
let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.querySelector(".typing").textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 50);
  } else {
    document.querySelector(".typing").classList.add("blink");
  }
}
window.onload = typeEffect;

// --- MODE SOMBRE / CLAIR --- //
const themeToggle = document.createElement("button");
themeToggle.innerText = "🌓";
themeToggle.classList.add("theme-toggle");
document.body.appendChild(themeToggle);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// --- BOUTON RETOUR EN HAUT --- //
const backToTop = document.createElement("button");
backToTop.innerText = "↑";
backToTop.classList.add("back-to-top");
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- ANIMATION APPARITION DES SECTIONS --- //
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// --- FOND DYNAMIQUE (PARTICULES QUI FLOTTENT) --- //
const canvas = document.createElement("canvas");
canvas.classList.add("bg-canvas");
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff99";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ff99";
    ctx.fill();
  }
}
function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
initParticles();
animate();

let allTestimonies = [];
let visibleTestimonies = [];

const TESTIMONY_LIMIT = 10;
const ROTATION_INTERVAL = 5 * 60 * 1000; // 5 minutes
const container = document.getElementById("testimonial-container");

function renderTestimonies() {
  container.innerHTML = ""; // Clear previous
  visibleTestimonies.forEach(t => {
    const div = document.createElement("div");
    div.className = "testimonial";
    div.innerHTML = `
      <p><strong>${t.name}</strong> - ${t.country} <img src="${t.flag}" alt="${t.country}" width="20"></p>
      <p>${t.message}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

function rotateTestimonies() {
  // Get the next unseen testimony
  const usedIds = new Set(visibleTestimonies.map(t => t.id));
  const next = allTestimonies.find(t => !usedIds.has(t.id));
  
  if (next) {
    visibleTestimonies.pop(); // Remove bottom
    visibleTestimonies.unshift(next); // Add new one to top
    renderTestimonies();
  } else {
    // If all testimonies used, reshuffle and restart
    initializeRotation();
  }
}

function initializeRotation() {
  allTestimonies = allTestimonies.map((t, index) => ({ id: index, ...t }));
  allTestimonies = shuffleArray(allTestimonies); // Shuffle testimonies
  visibleTestimonies = allTestimonies.slice(0, TESTIMONY_LIMIT);
  renderTestimonies();
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fetchTestimonies() {
  fetch("https://hack-justuce-backend.onrender.com/testimonies.json")
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(data => {
      allTestimonies = data;
      initializeRotation();
      setInterval(rotateTestimonies, ROTATION_INTERVAL);
    })
    .catch(err => {
      console.error("Error fetching testimonies:", err);
    });
}

document.addEventListener("DOMContentLoaded", fetchTestimonies);

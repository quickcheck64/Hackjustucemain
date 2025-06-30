const testimonialsUrl = "https://hack-justuce-backend.onrender.com/testimonies.json";
let allTestimonials = [];
let currentTestimonials = [];

const container = document.getElementById("testimonial-container");

async function fetchTestimonials() {
  try {
    const res = await fetch(testimonialsUrl);
    allTestimonials = await res.json();
    initializeRotation();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    container.innerHTML = "<p>Unable to load testimonials.</p>";
  }
}

function initializeRotation() {
  if (allTestimonials.length < 10) {
    container.innerHTML = "<p>Not enough testimonials to display.</p>";
    return;
  }

  // Pick first 10
  currentTestimonials = allTestimonials.slice(0, 10);
  displayTestimonials(currentTestimonials);

  // Start rotating
  setInterval(() => {
    rotateTestimonials();
  }, 5 * 60 * 1000); // Every 5 minutes
}

function displayTestimonials(list) {
  container.innerHTML = "";
  list.forEach(testimonial => {
    const div = document.createElement("div");
    div.className = "testimonial";
    div.innerHTML = `
      <p><strong>${testimonial.name}</strong> - ${testimonial.country} <img src="${testimonial.flag}" alt="" style="height: 14px;"> </p>
      <p>${testimonial.message}</p>
      <hr />
    `;
    container.appendChild(div);
  });
}

function rotateTestimonials() {
  const usedNames = new Set(currentTestimonials.map(t => t.name));
  const available = allTestimonials.filter(t => !usedNames.has(t.name));

  if (available.length === 0) return; // No new ones

  // Remove the last one, add a new one
  currentTestimonials.pop();
  const newOne = available[Math.floor(Math.random() * available.length)];
  currentTestimonials.unshift(newOne);
  displayTestimonials(currentTestimonials);
}

// Start
fetchTestimonials();

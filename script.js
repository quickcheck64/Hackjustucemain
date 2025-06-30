let allTestimonials = [];
let currentIndex = 0;
const container = document.getElementById("testimonial-container");

function addNextTestimonial() {
  if (allTestimonials.length === 0) return;

  // If we've reached the end, start over
  if (currentIndex >= allTestimonials.length) {
    currentIndex = 0;
  }

  const t = allTestimonials[currentIndex];

  // Create and insert new testimonial at the top
  const div = document.createElement("div");
  div.className = "testimonial";
  div.innerHTML = `
    <p><strong>${t.name}</strong> (${t.country}) <img src="${t.flag}" width="20" /></p>
    <p>${t.message}</p>
    <hr/>
  `;
  container.insertBefore(div, container.firstChild);

  // Remove last child if more than 10
  if (container.children.length > 10) {
    container.removeChild(container.lastChild);
  }

  currentIndex++;
}

async function fetchTestimonials() {
  try {
    const response = await fetch("https://hack-justuce-backend.onrender.com/testimonies.json");
    if (!response.ok) throw new Error("Failed to fetch");
    allTestimonials = await response.json();

    // Load initial 10
    for (let i = 0; i < 10; i++) {
      addNextTestimonial();
    }

    // Set interval for rotation every 2 minutes
    setInterval(addNextTestimonial, 120000);

  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

// Start
fetchTestimonials();

setInterval(() => {
  fetchTestimonies();
}, 60 * 1000); // Refresh every 1 minute

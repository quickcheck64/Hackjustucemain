let allTestimonials = [];
const container = document.getElementById("testimonial-container");

function displayTestimonials(testimonials) {
  container.innerHTML = "";
  testimonials.forEach((testimonial) => {
    const div = document.createElement("div");
    div.className = "testimonial";
    div.innerHTML = `
      <p><strong>${testimonial.name}</strong> (${testimonial.country}) <img src="${testimonial.flag}" width="20" /></p>
      <p>${testimonial.message}</p>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function getRandomTestimonials(count = 10) {
  const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function fetchTestimonials() {
  try {
    const response = await fetch("https://hack-justuce-backend.onrender.com/testimonies.json");
    if (!response.ok) throw new Error("Failed to fetch");
    allTestimonials = await response.json();
    displayTestimonials(getRandomTestimonials());
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

// Initial load
fetchTestimonials();

// Rotate every 5 minutes (300,000 ms)
setInterval(() => {
  if (allTestimonials.length) {
    displayTestimonials(getRandomTestimonials());
  }
}, 300000);

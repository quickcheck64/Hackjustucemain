// Static array of testimonials

const testimonials = [

  { name: "James O.", country: "UK", flag: "https://flagcdn.com/gb.svg", message: "They recovered 90% of my Bitcoin. Highly recommended!" },

  { name: "Amaka E.", country: "Nigeria", flag: "https://flagcdn.com/ng.svg", message: "They recovered my Instagram account. Very fast." },

  { name: "Sylvia K.", country: "USA", flag: "https://flagcdn.com/us.svg", message: "They helped recover $5,000 I lost to a scam." },

  { name: "Moses B.", country: "Ghana", flag: "https://flagcdn.com/gh.svg", message: "I got my hacked Gmail back in 48 hours!" },

  { name: "Chen W.", country: "Singapore", flag: "https://flagcdn.com/sg.svg", message: "They tracked my stolen crypto across wallets." },

  { name: "Fatima A.", country: "UAE", flag: "https://flagcdn.com/ae.svg", message: "They were honest and professional. Recommended!" },

  { name: "Liam R.", country: "Canada", flag: "https://flagcdn.com/ca.svg", message: "Recovered $3,000 from a fake forex site!" },

  { name: "Grace M.", country: "South Africa", flag: "https://flagcdn.com/za.svg", message: "They exposed the scammer that hacked my page." },

  { name: "David N.", country: "USA", flag: "https://flagcdn.com/us.svg", message: "Great support and fast recovery." },

  { name: "Linda E.", country: "Kenya", flag: "https://flagcdn.com/ke.svg", message: "They restored my hijacked WhatsApp quickly!" }

];

// Deterministically shuffle testimonials using seed (time-based)

function getDeterministicTestimonials() {

  const index = Math.floor(new Date().getTime() / (5 * 60 * 1000)); // 5-minute blocks

  const seed = index % 100000;

  // Simple seeded shuffle using a pseudo-random generator

  let arr = [...testimonials];

  for (let i = arr.length - 1; i > 0; i--) {

    let j = seededRandom(seed + i) % (i + 1);

    [arr[i], arr[j]] = [arr[j], arr[i]];

  }

  return arr.slice(0, 10); // Return 10 testimonials

}

// Basic seeded random number function

function seededRandom(seed) {

  let x = Math.sin(seed) * 10000;

  return Math.floor((x - Math.floor(x)) * 100000);

}

function renderTestimonials() {

  const container = document.getElementById("testimonial-container");

  const selected = getDeterministicTestimonials();

  container.innerHTML = selected.map(t => `

    <div class="testimonial">

      <h4><img class="flag" src="${t.flag}" alt="${t.country} flag"> ${t.name} (${t.country})</h4>

      <p>“${t.message}”</p>

    </div>

  `).join('');

}

document.addEventListener("DOMContentLoaded", () => {

  renderTestimonials();

  // Refresh testimonials at start of each new 5-min block

  const now = new Date();

  const delay = (5 * 60 * 1000) - (now.getTime() % (5 * 60 * 1000));

  setTimeout(() => {

    renderTestimonials();

    setInterval(renderTestimonials, 5 * 60 * 1000); // Every 5 min

  }, delay);

  // Handle form submission

  const form = document.getElementById("testimony-form");

  if (form) {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const success = document.getElementById("success-message");

      success.style.display = "block";

      form.reset();

      setTimeout(() => {

        success.style.display = "none";

      }, 8000); // Hide after 8 seconds

    });

  }

});
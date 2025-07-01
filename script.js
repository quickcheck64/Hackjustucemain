const TESTIMONY_URL = 'https://hack-justuce-backend.onrender.com/testimonies.json';
const SUBMIT_URL = 'https://hack-justuce-backend.onrender.com/submit_testimony';
const REFRESH_INTERVAL = 2 * 60 * 1000;

document.addEventListener('DOMContentLoaded', () => {
  const testimonyList = document.getElementById('testimonial-container');
  const form = document.getElementById('testimony-form');
  const successBox = document.getElementById('success-message');

  async function fetchAndDisplayTestimonies() {
    try {
      const res = await fetch(TESTIMONY_URL);
      if (!res.ok) throw new Error('Failed to fetch testimonies');
      const data = await res.json();

      testimonyList.innerHTML = '';
      data.forEach(t => {
        const li = document.createElement('li');
        li.className = `testimony ${t.style} ${t.animation}`;
        li.innerHTML = `
          <div class="name"><img src="${t.flag}" alt="Flag" width="20"> <strong>${t.name}</strong> - ${t.country}</div>
          <div class="message">"${t.message}"</div>
          <div class="timestamp">🕒 ${new Date(t.timestamp).toLocaleString()}</div>
        `;
        testimonyList.appendChild(li);
      });
    } catch (error) {
      console.error("Display error:", error);
      testimonyList.innerHTML = "<li>Unable to load testimonies at this time.</li>";
    }
  }

  async function submitTestimony(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const country = document.getElementById('country').value.trim();
    const flag = document.getElementById('flag')?.value?.trim() || '';
    const message = document.getElementById('message').value.trim();

    if (!name || !country || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = { name, country, flag, message };

    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.status === 'success') {
        form.reset();
        fetchAndDisplayTestimonies();
        showSuccess("✅ Testimony submitted successfully! Pending review for approval.");
      } else {
        showSuccess("❌ Failed to submit testimony: " + (result.reason || "Unknown error"));
      }
    } catch (err) {
      showSuccess("❌ Error submitting testimony. Please try again.");
      console.error(err);
    }
  }

  function showSuccess(message) {
    if (!successBox) return;
    successBox.textContent = message;
    successBox.style.display = 'block';
    successBox.style.opacity = '1';
    successBox.style.transition = 'opacity 0.8s ease-in-out';

    setTimeout(() => {
      successBox.style.opacity = '0';
    }, 5000);

    setTimeout(() => {
      successBox.style.display = 'none';
    }, 5800);
  }

  form.addEventListener('submit', submitTestimony);

  fetchAndDisplayTestimonies();
  setInterval(fetchAndDisplayTestimonies, REFRESH_INTERVAL);
});

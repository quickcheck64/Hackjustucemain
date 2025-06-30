const testimoniesContainer = document.getElementById("testimonies");
const testimoniesURL = "https://hack-justuce-backend.onrender.com/testimonies.json";

// Function to display testimonies
function displayTestimonies(data) {
  testimoniesContainer.innerHTML = ""; // Clear current testimonies
  data.forEach((item) => {
    const testimonyDiv = document.createElement("div");
    testimonyDiv.className = "testimony";
    testimonyDiv.innerHTML = `
      <p><strong>${item.name}</strong> from <img src="${item.flag}" alt="${item.country}" width="20"> ${item.country}:</p>
      <p>${item.message}</p>
      <hr>
    `;
    testimoniesContainer.appendChild(testimonyDiv);
  });
}

// Fetch testimonies from the backend
function fetchTestimonies() {
  fetch(testimoniesURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(data => {
      displayTestimonies(data);
    })
    .catch(error => {
      console.error("Error fetching testimonies:", error);
    });
}

// Initial fetch on load
fetchTestimonies();

// Set interval to update every 5 minutes
setInterval(fetchTestimonies, 300000); // 300,000 ms = 5 minutes

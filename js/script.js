// JavaScript untuk Honda Company Profile

// Fungsi untuk menampilkan greeting berdasarkan waktu
function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (!greetingElement) return;

  const now = new Date();
  const hours = now.getHours();
  let greeting = "";

  if (hours >= 5 && hours < 12) {
    greeting = "Selamat Pagi";
  } else if (hours >= 12 && hours < 15) {
    greeting = "Selamat Siang";
  } else if (hours >= 15 && hours < 18) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  greetingElement.innerHTML = `
        <div class="greeting-content">
            <h3 class="greeting-text">${greeting}!</h3>
            <p class="mb-0">Terima kasih telah mengunjungi Honda Indonesia</p>
        </div>
    `;
}

// Fungsi untuk filter produk
function setupProductFilter() {
  const filterButtons = document.querySelectorAll(".product-filter");
  const productItems = document.querySelectorAll(".product-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      productItems.forEach((item) => {
        const categories = item.getAttribute("data-category").split(" ");

        if (filterValue === "all" || categories.includes(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.9)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Fungsi untuk filter galeri
function setupGalleryFilter() {
  const filterButtons = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.9)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Fungsi untuk form kontak
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone")?.value || "";
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      showAlert("Harap isi semua field yang diperlukan.", "danger");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Harap masukkan alamat email yang valid.", "danger");
      return;
    }

    // Show success message
    showAlert(
      "Pesan Anda telah berhasil dikirim! Tim Honda akan menghubungi Anda dalam waktu 1x24 jam.",
      "success"
    );

    // Reset form
    contactForm.reset();
  });

  function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    // Insert after form
    contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);

    // Auto remove after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}

// Fungsi untuk navbar scroll effect
function setupNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Fungsi untuk smooth scrolling
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Fungsi untuk inisialisasi
function init() {
  displayGreeting();
  setupProductFilter();
  setupGalleryFilter();
  setupContactForm();
  setupNavbarScroll();
  setupSmoothScroll();

  // Update greeting every minute
  setInterval(displayGreeting, 60000);

  // Add fade-in animation to cards
  const cards = document.querySelectorAll(
    ".product-card, .tech-card, .value-card"
  );
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  console.log("Honda Company Profile - Initialized");
}

// Run initialization when DOM is ready
document.addEventListener("DOMContentLoaded", init);

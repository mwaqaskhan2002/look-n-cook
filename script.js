const heroSwiper = new Swiper(".heroSwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});

const categorySwiper = new Swiper(".categorySwiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  freeMode: true,
  navigation: {
    nextEl: ".category-next",
    prevEl: ".category-prev",
  },
});

// Click Active Toggle
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".category-btn")
      .forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
  });
});


// Testimonial Section
const testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonial-card");

  cards.forEach((card) => {
    const textElement = card.querySelector(".review-text");
    const toggleBtn = card.querySelector(".toggle-review-btn");

    if (!textElement || !toggleBtn) return;

    // Automatically hide button if review is 4 lines or under
    const isOverflowing = textElement.scrollHeight > textElement.clientHeight;
    if (!isOverflowing) {
      toggleBtn.classList.add("d-none");
    } else {
      toggleBtn.classList.remove("d-none");
    }

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isClamped = textElement.classList.contains("line-clamp-4");

      if (isClamped) {
        textElement.classList.remove("line-clamp-4");
        toggleBtn.textContent = "See Less";
      } else {
        textElement.classList.add("line-clamp-4");
        toggleBtn.textContent = "See More";
      }

      // Recalculate Swiper layout heights on toggle
      if (typeof testimonialSwiper !== "undefined") {
        testimonialSwiper.update();
      }
    });
  });
});
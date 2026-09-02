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

// ============================Category Button Active State========================
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".category-btn")
      .forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
  });
});
// ============================Category Button Active State End========================



// ==================Added to the CART TOAST & QTY PILL FUNCTIONALITY==================

// Toggle Pill vs Plus Button & Trigger Toast
function toggleQtyPill(btn, isInitialAdd) {
    const wrapper = btn.closest('.position-relative');
    const plusBtn = wrapper.querySelector('.add-btn-floating');
    const qtyPill = wrapper.querySelector('.qty-pill-floating');

    if (isInitialAdd) {
        plusBtn.classList.add('d-none');
        qtyPill.classList.remove('d-none');
        qtyPill.classList.add('d-flex');
        
        // Show Bootstrap Toast
        const toastEl = document.getElementById('cartToast');
        if (toastEl) {
            const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
            toast.show();
        }
    }
}


// Increment / Decrement Quantity
function updateQty(btn, change) {
    const pill = btn.closest('.qty-pill-floating');
    const wrapper = pill.closest('.position-relative');
    const plusBtn = wrapper.querySelector('.add-btn-floating');
    const countSpan = pill.querySelector('.qty-count');
    const trashBtn = pill.querySelector('.qty-btn:first-child');
    
    let currentQty = parseInt(countSpan.innerText);
    currentQty += change;

    if (currentQty <= 0) {
        // Reset to initial plus button when reaching 0
        pill.classList.add('d-none');
        pill.classList.remove('d-flex');
        plusBtn.classList.remove('d-none');
        countSpan.innerText = '1';
        
        // Reset left button back to Trash Icon
        trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trashBtn.className = 'qty-btn text-danger';
    } else {
        countSpan.innerText = currentQty;
        
        // Update left button icon: Trash if Qty == 1, Minus (-) if Qty > 1
        if (currentQty === 1) {
            trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            trashBtn.className = 'qty-btn text-danger';
        } else {
            trashBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
            trashBtn.className = 'qty-btn text-pink';
        }
    }
}

// ==================Added to the CART TOAST & QTY PILL FUNCTIONALITY==================


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



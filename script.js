document.addEventListener("DOMContentLoaded", () => {
  // HAMBURGER MENU LOGIC (Small Dropdown)
  const menuToggle = document.getElementById("menuToggle");
  const mobileDropdown = document.getElementById("mobileDropdown");

  if (menuToggle && mobileDropdown) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("change");
      mobileDropdown.classList.toggle("open");
    });
  }

  // TAB & CAROUSEL INTEGRATION LOGIC
  const tabButtons = document.querySelectorAll(".tab-button");
  const cardCarousel = document.getElementById("cardCarousel");
  const cards = document.querySelectorAll(".ai-card");
  let currentIndex = 0;
  let autoScrollInterval;
  const autoScrollDelay = 4000; // 4 seconds per card
  const pauseDelay = 5000;      // 5 seconds pause after manual selection

  // Move carousel to a given index and update active classes
  function moveToIndex(index) {
    // Remove active class from current card & tab
    cards[currentIndex].classList.remove("active");
    tabButtons[currentIndex].classList.remove("active");

    // Update current index and set new active
    currentIndex = index;
    cards[currentIndex].classList.add("active");
    tabButtons[currentIndex].classList.add("active");

    // Stop auto-scroll
    clearInterval(autoScrollInterval);

    // Calculate left offset to center the card
    const cardWidth = cards[currentIndex].offsetWidth + 30; // gap = 30
    const leftOffset =
      cards[currentIndex].offsetLeft -
      cardCarousel.offsetWidth / 2 +
      (cardWidth / 2);

    cardCarousel.scrollTo({
      left: leftOffset,
      behavior: "smooth",
    });

    // Resume auto-scroll after pauseDelay
    setTimeout(() => {
      autoScrollInterval = setInterval(autoScroll, autoScrollDelay);
    }, pauseDelay);
  }

  // Auto-scroll function
  function autoScroll() {
    let nextIndex = (currentIndex + 1) % cards.length;
    moveToIndex(nextIndex);
  }

  // Initialize active states
  if (cards.length > 0 && tabButtons.length > 0) {
    cards[currentIndex].classList.add("active");
    tabButtons[currentIndex].classList.add("active");
  }

  // Tab button click listeners
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      moveToIndex(index);
    });
  });

  // Start auto-scroll
  autoScrollInterval = setInterval(autoScroll, autoScrollDelay);
});

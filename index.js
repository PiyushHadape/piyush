const nameInput = document.getElementById("nameInput");
const greetButton = document.getElementById("greetButton");
const greetingText = document.getElementById("greetingText");
const dateText = document.getElementById("dateText");
const themeToggle = document.getElementById("themeToggle");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const formatDate = () => {
  const now = new Date();
  return now.toLocaleString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
};

const getTimeMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const updateGreeting = () => {
  const name = nameInput.value.trim();
  const friendlyName = name || "friend";
  const timeMessage = getTimeMessage();
  greetingText.textContent = `${timeMessage}, ${friendlyName}! I craft memorable digital experiences and keep learning something new every single day.`;
};

const applyTheme = (isDark) => {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

    projectCards.forEach((card) => {
      const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

greetButton.addEventListener("click", updateGreeting);
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateGreeting();
  }
});

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);
});

dateText.textContent = `Today is ${formatDate()}`;
updateGreeting();

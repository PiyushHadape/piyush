const nameInput = document.getElementById("nameInput");
const greetButton = document.getElementById("greetButton");
const greetingText = document.getElementById("greetingText");
const dateText = document.getElementById("dateText");
const themeToggle = document.getElementById("themeToggle");

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

const updateGreeting = () => {
  const name = nameInput.value.trim();
  const friendlyName = name || "friend";
  greetingText.textContent = `Hello, ${friendlyName}! I’m building creative digital experiences and learning something new every single day.`;
};

const applyTheme = (isDark) => {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

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

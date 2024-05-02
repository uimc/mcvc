// https://codepen.io/ayc0/pen/KKWZNMW

function getUserPreference() {
  return localStorage.getItem("theme") || "system";
}

function saveUserPreference(userPreference) {
  localStorage.setItem("theme", userPreference);
}

function getAppliedMode(userPreference) {
  if (userPreference === "light") {
    document.getElementById("icon-chng").classList.replace("bi-lightbulb-off", "bi-lightbulb-fill");
    return "light";
  }
  if (userPreference === "dark") {
    document.getElementById("icon-chng").classList.replace("bi-lightbulb-fill", "bi-lightbulb-off");
    return "dark";
  }
  // system
  if (matchMedia("(prefers-color-scheme: light)").matches) {
    document.getElementById("icon-chng").classList.replace("bi-lightbulb-off", "bi-lightbulb-fill");
    return "light";
  }
  document.getElementById("icon-chng").classList.replace("bi-lightbulb-fill", "bi-lightbulb-off");
  return "dark";
}

function setAppliedMode(mode) {
  document.documentElement.dataset.appliedMode = mode;
}

function rotatePreferences(userPreference) {
  if (userPreference === "system") {
    return "light";
  }
  if (userPreference === "light") {
    return "dark";
  }
  if (userPreference === "dark") {
    return "light";
  }
  // for invalid values, just in case
  return "system";
}

//const themeDisplay = document.getElementById("mode");
const themeToggler = document.getElementById("theme-toggle");

let userPreference = getUserPreference();
setAppliedMode(getAppliedMode(userPreference));
//themeDisplay.innerText = userPreference;

themeToggler.onclick = () => {
  const newUserPref = rotatePreferences(userPreference);
  userPreference = newUserPref;
  saveUserPreference(newUserPref);
  //themeDisplay.innerText = newUserPref;
  setAppliedMode(getAppliedMode(newUserPref));
};
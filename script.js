//your JS code here. If required.
// Function to set cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get cookies
function getCookie(name) {
  const nameEQ = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// Function to apply preferences from cookies
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// Save preferences and set cookies on form submission
document.getElementById("preferencesForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Set cookies for 30 days
  setCookie("fontsize", fontSize, 30);
  setCookie("fontcolor", fontColor, 30);

  // Apply the preferences immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// Apply preferences when the page loads
applyPreferences();

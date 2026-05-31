const API_URL =
  "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec";

const flags = {
  austria: "🇦🇹",
  azerbaijan: "🇦🇿",
  belgium: "🇧🇪",
  bulgaria: "🇧🇬",
  czechia: "🇨🇿",
  denmark: "🇩🇰",
  estonia: "🇪🇪",
  finland: "🇫🇮",
  france: "🇫🇷",
  germany: "🇩🇪",
  deutschland: "🇩🇪",
  allemagne: "🇩🇪",
  de: "🇩🇪",
  georgia: "🇬🇪",
  greece: "🇬🇷",
  hungary: "🇭🇺",
  magyarország: "🇭🇺",
  italy: "🇮🇹",
  italia: "🇮🇹",
  ireland: "🇮🇪",
  latvia: "🇱🇻",
  lithuania: "🇱🇹",
  moldova: "🇲🇩",
  netherlands: "🇳🇱",
  norway: "🇳🇴",
  poland: "🇵🇱",
  romania: "🇷🇴",
  spain: "🇪🇸",
  serbia: "🇷🇸",
  sweden: "🇸🇪",
  switzerland: "🇨🇭",
  schweiz: "🇨🇭",
  ch: "🇨🇭",
  türkiye: "🇹🇷",
  turkey: "🇹🇷",
  argentina: "🇦🇷",
  brazil: "🇧🇷",
  canada: "🇨🇦",
  chile: "🇨🇱",
  ecuador: "🇪🇨",
  mexico: "🇲🇽",
  paraguay: "🇵🇾",
  uruguay: "🇺🇾",
  usa: "🇺🇸",
  venezuela: "🇻🇪",
  china: "🇨🇳",
  india: "🇮🇳",
  indonesia: "🇮🇩",
  japan: "🇯🇵",
  mongolia: "🇲🇳",
  philippines: "🇵🇭",
  "south Korea": "🇰🇷",
  thailand: "🇹🇭",
  vietnam: "🇻🇳",
  ghana: "🇬🇭",
  liberia: "🇱🇷",
  namibia: "🇳🇦",
  "south Africa": "🇿🇦",
  australia: "🇦🇺",
};

async function saveDataToStorage() {
  if (!sessionStorage.getItem("APIresponse")) {
    try {
      const res = await fetch(API_URL);
      const text = await res.text();

      sessionStorage.setItem("APIresponse", text);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }
  return sessionStorage.getItem("APIresponse");
}

function getDataFromStorage() {
  return sessionStorage.getItem("APIresponse");
}

const getCountryFlags = (countryString) => {
  const words = countryString
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/);

  return words
    .map((word) => flags[word])
    .filter((flag) => flag !== undefined)
    .join(" ");
};

// Add Event Listener to window
window.addEventListener("load", async () => {
  if (!document.getElementById("registrations-list")) return; // not on this page

  const title = document.getElementById("title");
  const subtitle = document.getElementById("sub-title");

  try {
    const text = await saveDataToStorage(); // await in case fetch is still in progress
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Parsing error:", err);
    }

    const registrations = data.visibleRows || [];
    const list = document.getElementById("registrations-list");

    title.innerHTML = `${data.totalCount} lovely people are signed up 🏕️`;
    subtitle.style.display = "none";
    list.innerHTML = "";

    registrations.forEach((reg) => {
      const li = document.createElement("li");
      li.className = "registration";
      const countries = reg.country;
      const countriesSanitized = countries.toLowerCase();
      const flag = getCountryFlags(countriesSanitized);
      const nameLine = reg.country
        ? `<strong>${reg.name}</strong> from ${reg.country} ${flag}`
        : `<strong>${reg.name}</strong>`;
      li.innerHTML = `
        <div>${nameLine}</div>
        ${reg.message ? `<div class="quote">"${reg.message}"</div>` : ""}
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading registrations:", err);
    title.textContent = "⚠️ Couldn't load registrations.";
    subtitle.textContent = "try refreshing the page or reach out to us";
  }
});

saveDataToStorage(); // kicks off fetch immediately on both pages
document.getElementById("phone-number").style.display = "none";

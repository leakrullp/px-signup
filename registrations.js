const API_URL =
  "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec";

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

function getCountryFlag(country) {
  const flags = {
    Austria: "🇦🇹",
    Azerbaijan: "🇦🇿",
    Belgium: "🇧🇪",
    Bulgaria: "🇧🇬",
    Czechia: "🇨🇿",
    Denmark: "🇩🇰",
    Estonia: "🇪🇪",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Deutschland: "🇩🇪",
    Georgia: "🇬🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    Italy: "🇮🇹",
    Latvia: "🇱🇻",
    Lithuania: "🇱🇹",
    Moldova: "🇲🇩",
    Netherlands: "🇳🇱",
    Norway: "🇳🇴",
    Poland: "🇵🇱",
    Romania: "🇷🇴",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Türkiye: "🇹🇷",
    Turkey: "🇹🇷",
    Argentina: "🇦🇷",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Chile: "🇨🇱",
    Ecuador: "🇪🇨",
    Mexico: "🇲🇽",
    Paraguay: "🇵🇾",
    Uruguay: "🇺🇾",
    USA: "🇺🇸",
    Venezuela: "🇻🇪",
    China: "🇨🇳",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Japan: "🇯🇵",
    Mongolia: "🇲🇳",
    Philippines: "🇵🇭",
    "South Korea": "🇰🇷",
    Thailand: "🇹🇭",
    Vietnam: "🇻🇳",
    Ghana: "🇬🇭",
    Liberia: "🇱🇷",
    Namibia: "🇳🇦",
    "South Africa": "🇿🇦",
    Australia: "🇦🇺",
  };

  return flags[country] || "";
}
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
      const flag = getCountryFlag(reg.country);
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

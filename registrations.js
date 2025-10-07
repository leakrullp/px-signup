const API_URL =
  "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec";

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
async function loadRegistrations() {
  const title = document.getElementById("title");
  const subtitle = document.getElementById("sub-title");

  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    console.log("Raw text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Parsing error:", err);
    }

    console.log("Fetched data:", data);
    const registrations = data.visibleRows || [];

    const list = document.getElementById("registrations-list");

    title.innerHTML = `${data.totalCount} lovely people are signed up 🏕️`;
    subtitle.textContent = "they include:";
    list.innerHTML = "";

    registrations.forEach((reg) => {
      const li = document.createElement("li");
      li.className = "registration";
      const flag = getCountryFlag(reg.country);

      const nameLine = reg.country
        ? `<strong>${reg.name}</strong> from <span class="country">${reg.country}</span> ${flag}`
        : `<strong>${reg.name}</strong>`;

      li.innerHTML = `
                        <div>${nameLine}</div>
                        ${
                          reg.message
                            ? `<div class="quote">“${reg.message}”</div>`
                            : ""
                        }
                    `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading registrations:", err);
    title.textContent = "⚠️ Couldn't load registrations.";
    subtitle.textContent = "try refreshing the page or reach out to us";
  }
}

loadRegistrations();

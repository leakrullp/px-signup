const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const registrationsFile = path.join(__dirname, "registrations.json");

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML, CSS, JS

// Handle form submissions
app.post("/register", (req, res) => {
  const { name, email, country, message } = req.body;
  if (!name || !email || !country) {
    return res.status(400).json({ error: "Missing name, email, or country" });
  }

  let registrations = [];
  if (fs.existsSync(registrationsFile)) {
    registrations = JSON.parse(fs.readFileSync(registrationsFile));
  }

  registrations.push({
    name,
    email,
    country,
    message: message || "",
  });

  fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));

  res.status(200).json({ message: "Registered successfully" });
});

// Get all registrations
app.get("/registrations", (req, res) => {
  if (!fs.existsSync(registrationsFile)) {
    return res.json([]);
  }
  const registrations = JSON.parse(fs.readFileSync(registrationsFile));
  res.json(registrations);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

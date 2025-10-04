document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      timestamp: new Date().toISOString(),
      name: formData.get("name"),
      email: formData.get("email"),
      country: formData.get("country"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://sheetdb.io/api/v1/evoz3raw0gqor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [data] }),
      });

      if (res.ok) {
        alert("✅ Registration successful!");
        e.target.reset();
      } else {
        alert("❌ Error submitting registration.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Network error. Please try again later.");
    }
  });

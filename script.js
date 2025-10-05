document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // 💡 Convert FormData to a standard JavaScript object first
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      country: formData.get("country"),
      message: formData.get("message"),
      // Ensure 'visible' is either 'yes' or 'no'
      visible: formData.get("visible") === "yes" ? "yes" : "no",
    };

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec",
        {
          method: "POST",
          // 🔑 Use URL-encoded format, which Apps Script handles easily
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          // 🔑 Convert the data object into a URL query string
          body: new URLSearchParams(data).toString(),
        }
      );

      // 💡 Read the response text from your doPost(e) function ("ok" or "error:...")
      const responseText = await res.text();

      if (responseText.startsWith("ok")) {
        // ✅ Success confirmed by the server response
        alert("✅ Registration successful!");
        e.target.reset();
      } else {
        // ❌ Error confirmed by the server response
        throw new Error(responseText);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error submitting registration: " + err.message);
    }
  });

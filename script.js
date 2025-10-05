document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      email: formData.get("phone"), //OBS
      email: formData.get("connection"), //OBS
      country: formData.get("country"),
      message: formData.get("message"),
      visible: formData.get("visible") === "yes" ? "yes" : "no",
    };

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        }
      );

      const responseText = await res.text();

      if (responseText.startsWith("ok")) {
        alert("✅ Registration successful!");
        e.target.reset();
      } else {
        throw new Error(responseText);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error submitting registration: " + err.message);
    }
  });

function toggleButton() {
  const checkbox = document.querySelector('input[name="consent"]');
  const button = document.getElementById("submit-btn");

  button.disabled = !checkbox.checked;
}

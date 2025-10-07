document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector("#submit-btn");
    const loader = document.querySelector("#loader");

    submitBtn.style.visibility = "hidden";
    loader.style.display = "block";

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      connection: formData.get("connection"),
      country: formData.get("country"),
      message: formData.get("message"),
      visible: formData.get("visible") === "yes" ? "yes" : "no",
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwTt7rCfy99b5YwDP_45GrBETa_2vWCCkgxTRMQP21MN0LCT9otgb96QNOZGfbDj8ru/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        }
      );

      alert("🎉 Thank you for signing up for PX 2026!");
      e.target.reset();
      document.getElementById("submit-btn").disabled = true;
    } catch (err) {
      alert("⚠️ Error submitting form. Please try again later.");
      console.error(err);
    } finally {
      loader.style.display = "none";
      submitBtn.style.visibility = "visible";
    }
  });

function toggleButton() {
  const checkbox = document.querySelector('input[name="consent"]');
  const button = document.getElementById("submit-btn");

  button.disabled = !checkbox.checked;
}

document.getElementById("phone-number").style.display = "none";

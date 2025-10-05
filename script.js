document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // const data = {
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   country: formData.get("country"),
    //   message: formData.get("message"),
    //   visible: formData.get("visible") === "yes" ? "yes" : "no",
    // };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxaqD55Iv-a3bKLE4DMVBmcTd0E1usjZmJ45nlABJ3UOMH4FiRyaKQSpEjzeArTOnEM/exec",
        {
          method: "POST",
          body: formData, // 👈 send as multipart/form-data
        }
      );

      // ✅ Assume success, since we can’t verify in no-cors mode
      alert("✅ Registration successful!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("⚠️ Network error. Please try again later.");
    }
  });

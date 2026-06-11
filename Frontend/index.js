const messages = [
  "finding the invisible city...",
  "tuning the radio...",
  "collecting lost fragments...",
  "almost there ✦",
];

function enterCity() {
  const landing = document.querySelector(".landing");
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");

  landing.style.transition = "opacity 0.8s ease";
  landing.style.opacity = "0";

  setTimeout(() => {
    landing.style.display = "none";
    loader.style.display = "flex";

    let i = 0;
    const interval = setInterval(() => {
      loaderText.style.opacity = "0";

      setTimeout(() => {
        loaderText.textContent = messages[i];
        loaderText.style.transition = "opacity 0.4s ease";
        loaderText.style.opacity = "1";
        i++;

        if (i >= messages.length) {
          clearInterval(interval);
          setTimeout(() => {
            loader.style.display = "none";
            showApp();
          }, 800);
        }
      }, 400);
    }, 1200);
  }, 800);
  window.location.href = "./App/App.html";
}

const API = "http://localhost:5000/api/fragments";
let fragments = [];
let tuneInterval = null;

async function fetchFragments() {
  const res = await fetch(API);
  fragments = await res.json();
  if (fragments.length > 0) tuneRadio();
  else
    document.getElementById("now-playing").textContent =
      "no fragments yet. be the first ✦";
}

function tuneRadio() {
  const display = document.getElementById("now-playing");
  if (tuneInterval) clearInterval(tuneInterval);

  tuneInterval = setInterval(function () {
    const random = fragments[Math.floor(Math.random() * fragments.length)];
    display.style.opacity = "0";
    setTimeout(function () {
      display.textContent = '"' + random.text + '"';
      display.style.opacity = "1";
    }, 400);
  }, 3000);
}

async function submitFragment() {
  const text = document.getElementById("radio-fragment").value;
  if (!text) {
    alert("say something ✦");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  document.getElementById("radio-fragment").value = "";
  fetchFragments();
}

fetchFragments();

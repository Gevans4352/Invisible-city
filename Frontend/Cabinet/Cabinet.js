const API = "http://localhost:5000/api/buildings";

async function fetchObjects() {
  const res = await fetch(API);
  const objects = await res.json();
  renderCabinet(objects);
}

function renderCabinet(objects) {
  const grid = document.getElementById("cabinet-grid");

  if (objects.length === 0) {
    grid.innerHTML =
      '<p class="empty">no objects yet. invent the first one ✦</p>';
    return;
  }

  grid.innerHTML = objects
    .map(function (obj) {
      return (
        '<div class="cabinet-card" onclick="toggleFragment(this)">' +
        '<span class="card-vibe">' +
        obj.vibe +
        "</span>" +
        '<h3 class="card-name">' +
        obj.name +
        "</h3>" +
        '<p class="card-object">' +
        obj.object +
        "</p>" +
        '<p class="card-fragment">' +
        obj.fragment +
        "</p>" +
        "</div>"
      );
    })
    .join("");
}

function toggleFragment(card) {
  card.classList.toggle("revealed");
}

async function submitObject() {
  const name = document.getElementById("cab-name").value;
  const vibe = document.getElementById("cab-vibe").value;
  const object = document.getElementById("cab-object").value;
  const fragment = document.getElementById("cab-fragment").value;

  if (!name || !vibe || !object || !fragment) {
    alert("fill everything in ✦");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, vibe, object, fragment }),
  });

  document.getElementById("cab-name").value = "";
  document.getElementById("cab-vibe").value = "";
  document.getElementById("cab-object").value = "";
  document.getElementById("cab-fragment").value = "";

  fetchObjects();
}

fetchObjects();

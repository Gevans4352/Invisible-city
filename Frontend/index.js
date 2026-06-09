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
}

function switchTab(tab) {
  document
    .querySelectorAll(".tab-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
  event.target.classList.add("active");
}
async function fetchBuildings() {
  const res = await fetch("http://localhost:5000/api/buildings");
  const buildings = await res.json();
  renderSkyline(buildings);
}

function renderSkyline(buildings) {
  const skyline = document.getElementById("skyline");
  const w = skyline.offsetWidth;
  const h = 260;

  if (buildings.length === 0) {
    skyline.innerHTML = '<p style="color:#7b6f9e; font-size:0.75rem; font-family:Space Mono; text-align:center; margin-top:110px;">no buildings yet. be the first ✦</p>';
    return;
  }

  const colors = ["#ff2d78", "#c44dff", "#00f5d4", "#ff6b35", "#ffb3d1"];
  let svgContent = '<svg width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">';

  buildings.forEach(function(b, i) {
    const bw = Math.max(40, 60 + b.name.length * 2);
    const bh = 60 + ((b.id * 37) % 140);
    const x = i * (w / buildings.length) + 10;
    const y = h - bh;
    const color = colors[i % colors.length];
    const windows = Math.floor(bh / 20);

    svgContent += '<g class="building" data-fragment="' + b.fragment + '" data-name="' + b.name + '" data-object="' + b.object + '">';
    svgContent += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" fill="#2d1b4e" rx="3"/>';

    for (let wi = 0; wi < windows; wi++) {
      const wy = y + 10 + wi * 18;
      const op1 = Math.random() > 0.4 ? 0.9 : 0.3;
      const op2 = Math.random() > 0.4 ? 0.8 : 0.2;
      svgContent += '<rect x="' + (x + 8) + '" y="' + wy + '" width="8" height="8" fill="' + color + '" opacity="' + op1 + '" rx="1"/>';
      svgContent += '<rect x="' + (x + 22) + '" y="' + wy + '" width="8" height="8" fill="' + color + '" opacity="' + op2 + '" rx="1"/>';
    }

    svgContent += '</g>';
  });

  svgContent += '</svg>';
  skyline.innerHTML = svgContent;

  document.querySelectorAll('.building').forEach(function(b) {
    b.style.cursor = 'pointer';
    b.addEventListener('mouseenter', function() {
      const tip = document.getElementById('skyline-tip');
      tip.textContent = '"' + b.dataset.fragment + '" — ' + b.dataset.name;
      tip.style.opacity = '1';
    });
    b.addEventListener('mouseleave', function() {
      document.getElementById('skyline-tip').style.opacity = '0';
    });
  });
}

function showApp() {
  const app = document.getElementById("app");
  app.style.display = "flex";
  app.style.opacity = "0";
  app.style.transition = "opacity 0.8s ease";
  setTimeout(() => {
    app.style.opacity = "1";
  }, 50);
  setTimeout(() => {
    fetchBuildings();
  }, 900);
}

function switchTab(e, tab) {
  document.querySelectorAll(".tab-section").forEach((s) => s.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
  e.target.classList.add("active");
}

async function submitBuilding() {
  const name = document.getElementById("city-name").value;
  const vibe = document.getElementById("city-vibe").value;
  const object = document.getElementById("city-object").value;
  const fragment = document.getElementById("city-fragment").value;

  if (!name || !vibe || !object || !fragment) {
    alert("fill everything in ✦");
    return;
  }

  await fetch("http://localhost:5000/api/buildings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, vibe, object, fragment }),
  });

  document.getElementById("city-name").value = "";
  document.getElementById("city-vibe").value = "";
  document.getElementById("city-object").value = "";
  document.getElementById("city-fragment").value = "";

  fetchBuildings();
}

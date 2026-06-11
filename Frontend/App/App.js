
function fetchBuildings() {
  setTimeout(() => {
    fetch("http://localhost:5000/api/buildings")
      .then(res => res.json())
      .then(buildings => renderSkyline(buildings));
  }, 300);
}

function renderSkyline(buildings) {
  const skyline = document.getElementById("skyline");
  const tip = document.getElementById("skyline-tip");
  const containerWidth = skyline.offsetWidth || window.innerWidth - 48;
  const h = 260;

  const oldSvg = skyline.querySelector("svg");
  if (oldSvg) oldSvg.remove();

  if (buildings.length === 0) {
    const msg = document.createElement("p");
    msg.style.cssText =
      "color:#7b6f9e; font-size:0.75rem; font-family:Space Mono; text-align:center; margin-top:110px;";
    msg.textContent = "✦ No buildings yet. be the first ✦";
    skyline.appendChild(msg);
    return;
  }

  const colors = ["#ff2d78", "#c44dff", "#00f5d4", "#ff6b35", "#ffb3d1"];
  
  // Calculate responsive building width based on container and count
  const gap = 8;
  const availableWidth = containerWidth - (gap * (buildings.length + 1));
  const bw = Math.max(24, Math.min(70, Math.floor(availableWidth / buildings.length)));
  
  // Calculate total skyline width (buildings + gaps)
  const totalWidth = (bw * buildings.length) + (gap * (buildings.length + 1));
  const w = Math.max(containerWidth, totalWidth);

  let svgContent =
    '<svg width="100%" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">';

  buildings.forEach(function (b, i) {
    const bh = 60 + ((b.id * 37) % 140);
    // Center the group of buildings if they don't fill the width
    const startX = (w - totalWidth) / 2 + gap;
    const x = startX + i * (bw + gap);
    const y = h - bh;
    const color = colors[i % colors.length];
    const windows = Math.floor(bh / 20);

    svgContent +=
      '<g class="building" data-fragment="' +
      b.fragment +
      '" data-name="' +
      b.name +
      '" data-object="' +
      b.object +
      '">';
    svgContent +=
      '<rect x="' +
      x +
      '" y="' +
      y +
      '" width="' +
      bw +
      '" height="' +
      bh +
      '" fill="#2d1b4e" rx="3"/>';

    // Responsive window sizing
    const winSize = Math.max(4, Math.min(8, bw / 4));
    const winGap = Math.max(2, (bw - winSize * 2) / 3);
    
    for (let wi = 0; wi < windows; wi++) {
      const wy = y + 10 + wi * 18;
      const op1 = Math.random() > 0.4 ? 0.9 : 0.3;
      const op2 = Math.random() > 0.4 ? 0.8 : 0.2;
      svgContent +=
        '<rect x="' +
        (x + winGap) +
        '" y="' +
        wy +
        '" width="' + winSize + '" height="' + winSize + '" fill="' +
        color +
        '" opacity="' +
        op1 +
        '" rx="1"/>';
      svgContent +=
        '<rect x="' +
        (x + winGap * 2 + winSize) +
        '" y="' +
        wy +
        '" width="' + winSize + '" height="' + winSize + '" fill="' +
        color +
        '" opacity="' +
        op2 +
        '" rx="1"/>';
    }

    svgContent += "</g>";
  });

  svgContent += "</svg>";

  const svgWrapper = document.createElement("div");
  svgWrapper.style.width = "100%";
  svgWrapper.style.overflowX = buildings.length > 5 ? "auto" : "hidden";
  svgWrapper.innerHTML = svgContent;
  skyline.insertBefore(svgWrapper.firstChild, tip);

  document.querySelectorAll(".building").forEach(function (b) {
    b.style.cursor = "pointer";
    b.addEventListener("mouseenter", function () {
      tip.textContent = '"' + b.dataset.fragment + '" — ' + b.dataset.name;
      tip.style.opacity = "1";
    });
    b.addEventListener("mouseleave", function () {
      tip.style.opacity = "0";
    });
  });
}

function switchTab(e, tab) {
  document
    .querySelectorAll(".tab-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
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

fetchBuildings();

function getType(m) {
  const name = m.name.toLowerCase();
  if (name.includes("starlink")) return "satellite";
  if (name.includes("crew")) return "crew";
  if (name.includes("cargo")) return "cargo";
  return "other";
}

function display(data) {
  const container = document.getElementById("missions");
  container.innerHTML = "";

  const fav = JSON.parse(localStorage.getItem("fav")) || [];

  data.forEach(m => {
    const isFav = fav.includes(m.id);

    let buttonHTML = isFav
      ? `
        <button onclick="removeFav('${m.id}', this)">❌ Remove</button>
        <button onclick="window.location.href='favorites.html'">🛒 Go</button>
      `
      : `<button onclick="saveFav('${m.id}', this)">⭐ Save</button>`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <img src="${m.links.patch.small || ''}">
  <h3>${m.name}</h3>
  <p>${new Date(m.date_utc).toDateString()}</p>
  <p>${m.success ? "✅ Success" : "❌ Failed"}</p>
  <p class="type">${getType(m)}</p>

  <div class="card-buttons">
    <div class="action-buttons" id="actions-${m.id}">
      ${
        fav.includes(m.id)
        ? `
          <button onclick="removeFav('${m.id}', this)">❌ Remove</button>
          <button onclick="window.location.href='favorites.html'">🛒 Go</button>
        `
        : `<button onclick="saveFav('${m.id}', this)">⭐ Save</button>`
      }
    </div>

    ${m.links.wikipedia ? `<a href="${m.links.wikipedia}" target="_blank">Wiki</a>` : ""}
  </div>
`;

    container.appendChild(card);
  });
}
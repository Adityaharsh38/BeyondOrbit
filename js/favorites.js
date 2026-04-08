async function loadFavorites() {
  const data = await fetch("https://api.spacexdata.com/v4/launches").then(r=>r.json());
  const fav = JSON.parse(localStorage.getItem("fav")) || [];

  const container = document.getElementById("favorites");
  container.innerHTML = "";

  const favData = data.filter(m => fav.includes(m.id));

  favData.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${m.links.patch.small || ''}">
      <h3>${m.name}</h3>
      <a href="${m.links.wikipedia}" target="_blank">📖 Read</a>
      <button onclick="removeFav('${m.id}')">❌ Remove</button>
    `;

    container.appendChild(card);
  });
}

function removeFav(id) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  fav = fav.filter(f => f !== id);
  localStorage.setItem("fav", JSON.stringify(fav));
  location.reload();
}

loadFavorites();
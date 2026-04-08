let data = [];

async function init() {
  data = await getData();
  display(data);
}

/* SEARCH ICON */
document.getElementById("searchIcon").addEventListener("click", () => {
  document.getElementById("search").classList.toggle("active");
});

/* SEARCH */
document.getElementById("search").addEventListener("input", e => {
  display(data.filter(m => m.name.toLowerCase().includes(e.target.value.toLowerCase())));
});

/* FILTER */
document.getElementById("filter").addEventListener("change", e => {
  let val = e.target.value;
  if (val === "all") return display(data);
  if (val === "success") return display(data.filter(m => m.success));
  if (val === "fail") return display(data.filter(m => !m.success));
});

/* TYPE FILTER */
document.getElementById("typeFilter").addEventListener("change", e => {
  let val = e.target.value;
  if (val === "all") return display(data);
  display(data.filter(m => getType(m) === val));
});

/* SORT */
document.getElementById("sort").addEventListener("change", e => {
  let sorted = [...data];
  if (e.target.value === "date") sorted.sort((a,b)=> new Date(a.date_utc)-new Date(b.date_utc));
  if (e.target.value === "name") sorted.sort((a,b)=> a.name.localeCompare(b.name));
  display(sorted);
});

/* SAVE FAVORITE */
function saveFav(id, btn) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];

  if (!fav.includes(id)) {
    fav.push(id);
    localStorage.setItem("fav", JSON.stringify(fav));

    showToast();

    btn.innerText = "🛒 Go";
    btn.onclick = () => window.location.href = "favorites.html";
  }
}

/* TOAST */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);

}
/* SAVE */
function saveFav(id, btn) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];

  if (!fav.includes(id)) {
    fav.push(id);
    localStorage.setItem("fav", JSON.stringify(fav));

    showToast("Added to Favorites ⭐");

    const actionDiv = document.getElementById(`actions-${id}`);
    actionDiv.innerHTML = `
      <button onclick="removeFav('${id}', this)">❌ Remove</button>
      <button onclick="window.location.href='favorites.html'">🛒 Go</button>
    `;
  }
}

/* REMOVE */
function removeFav(id, btn) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];

  fav = fav.filter(f => f !== id);
  localStorage.setItem("fav", JSON.stringify(fav));

  showToast("Removed from Favorites ❌");

  // Update UI instantly
  btn.parentElement.innerHTML = `
    <button onclick="saveFav('${id}', this)">⭐ Save</button>
  `;
}

init();
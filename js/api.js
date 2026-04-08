const API = "https://api.spacexdata.com/v4/launches";

async function getData() {
  const res = await fetch(API);
  return await res.json();
}
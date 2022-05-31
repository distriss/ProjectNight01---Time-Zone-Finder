document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const city = document.querySelector("#cityinput").value.toLowerCase();
  const res = await fetch(`/api?city=${city}`)
  const data = await res.json()
  console.log(data);
  
  let cards = document.querySelectorAll(".card")
  Array.from(cards).forEach(element => element.classList.remove('hidden'))

  document.querySelector("#city").textContent = `${city.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")}`
  document.querySelector("#timezone").textContent = `Timezone: ${data.timezone}`
  
  const date = new Date();
  const offset = -date.getTimezoneOffset();
  const offsetString = offset > 0 ? "GMT + "+offset/60 : "GMT - " + Math.abs(offset)/60;

  document.querySelector("#local").textContent = "Current Location"
  document.querySelector("#localtimezone").textContent = "Timezone: " + offsetString;
}
let order = JSON.parse(localStorage.getItem("orderId"));

let id = document.getElementById("orderId");

console.log("order", JSON.stringify(order))


idRandom = String(Math.random()); 
id.innerText = Number (idRandom.slice(2, 14));

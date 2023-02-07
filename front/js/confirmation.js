let order = localStorage.getItem("orderId");
console.log("order", JSON.stringify(order))



let id = document.getElementById("orderId");
id.innerText = order;
localStorage.clear();
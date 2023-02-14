const params = new URLSearchParams(document.location.search);
let order = params.get("id");
let id = document.getElementById("orderId");
id.innerText = order;


console.log(order);

localStorage.clear();

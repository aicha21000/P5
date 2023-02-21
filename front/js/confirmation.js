const params = new URLSearchParams(document.location.search); // get id from url
let order = params.get("id"); 
let id = document.getElementById("orderId"); 
id.innerText = order; // put id in html


console.log(order);

localStorage.clear();

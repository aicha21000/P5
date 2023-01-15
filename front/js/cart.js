

const local = JSON.parse(localStorage.getItem("cart"));
const cartName = document.getElementById("cartName"); 
const cartColor = document.getElementById("cartColor"); 
const cartPrice = document.getElementById("cartPrice"); 
const cartQuantity = document.getElementById("cartQuantity"); 
const cartTotal = document.getElementById("totalQuantity"); 
const cartTotalPrice = document.getElementById("totalPrice"); 
const cartImage = document.getElementById("itemsImg"); 


cartImage.src = `${local[4]}`;

cartName.textContent = `${local[0]}`;

cartColor.textContent = `${local[2]}`;
cartPrice.textContent = `${local[1]}` + " €";
cartQuantity.value = `${local[3]}`;

cartTotal.textContent = `${local[3]}`;

cartQuantity.addEventListener ("change", function() {
cartTotalPrice.textContent = `${cartQuantity.value * local[1]}`;
})
const local = JSON.parse(localStorage.getItem("product"));
const nameId = document.getElementById("title"); 
const priceId = document.getElementById("price");
const idDescription = document.getElementById("description"); 
const colorId = document.getElementById("colors");
let imageId = document.getElementById("itemsImg");
const elementQuantity = document.getElementById("quantity");
const cartId = document.getElementById("addToCart");

// add colors



        nameId.textContent = `${local.name}`;
        priceId.textContent = `${local.price}`;
        idDescription.textContent = `${local.description}`;
        imageId.src = `${local.imageUrl}`;
        listNew = local.colors;
        listNew.forEach((item, key)=>{
        colorId[key] = new Option(item, key); 
           });

// add cart

const cart = [];


cartId.addEventListener("click", function() { 

if (elementQuantity.value > 0) {
        const selectedElement = colorId.selectedIndex;
        const objetCart = [local.name, local.price, listNew[selectedElement], elementQuantity.value, imageId.src];

cart.push(objetCart);


console.log(cart)
localStorage.setItem("cart", JSON.stringify(cart));     

}}); 

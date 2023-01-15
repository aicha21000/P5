const local = JSON.parse(localStorage.getItem("product"));
const nameId = document.getElementById("title"); 
const priceId = document.getElementById("price");
const idDescription = document.getElementById("description"); 
const colorId = document.getElementById("colors");
let imageId = document.getElementById("itemsImg");

// add colors


if(local != null) 
        nameId.textContent = `${local.name}`;
        priceId.textContent = `${local.price}`;
        idDescription.textContent = `${local.description}`;
        imageId.src = `${local.imageUrl}`;
        listNew = local.colors;
        listNew.forEach((item, key)=>{
        colorId[key] = new Option(item, key); 
      

// add cart
const cartId = document.getElementById("addToCart");
// cartId.addEventListener("click", function(){ 
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if(cart == null) {
//         cart = [];
//     }
//     cart.push(local);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Produit ajouté au panier");
// });

const elementQuantity = document.getElementById("quantity");

cartId.addEventListener("click", function(){ 
const selectedElement = selectedIndex = colorId.selectedIndex;
if (elementQuantity.value > 0) {
    
const cart = [];
cart.push(nameId.textContent, priceId.textContent, listNew[selectedElement], elementQuantity.value, imageId.src);
console.log(cart)
localStorage.setItem("cart", JSON.stringify(cart));

}});
}) 

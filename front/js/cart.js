// const local = JSON.parse(localStorage.getItem("cart"));    
// const article = document.getElementById("cart__items");
// const cartName = document.getElementById("cartName"); 
// const cartColor = document.getElementById("cartColor"); 
// const cartPrice = document.getElementById("cartPrice"); 
// const cartQuantity = document.getElementById("cartQuantity"); 
// const cartTotal = document.getElementById("totalQuantity"); 
// const cartTotalPrice = document.getElementById("totalPrice"); 
// const cartImage = document.getElementById("itemsImg"); 
// const cartDelete = document.getElementById("deleteItem"); 
// // si le panier est vide
// if(local === null) {
//     console.log ("panier vide");
// }
// else {
//     let structure = [];
//     for (let i = 0; i < local.length; i++) {
//         newOne = local[i];


// cartQuantity.addEventListener ("change", function() {
// cartTotalPrice.textContent = `${cartQuantity.value * local[i][1]}`;
// cartTotal.textContent = cartQuantity.value + cartQuantity.textContent;

// // location.reload()
// }

// )
// cartDelete.addEventListener("click", function() {cartTotal.textContent = 0; cartTotalPrice.textContent = 0 

// })
// if( i == local.length) {
//     local = structure
// }

// }

// }


const article = document.getElementById("cart__items");
const cartName = document.getElementById("cartName"); 
const cartColor = document.getElementById("cartColor"); 
const cartPrice = document.getElementById("cartPrice"); 
const cartQuantity = document.getElementById("cartQuantity"); 
const cartTotal = document.getElementById("totalQuantity"); 
const cartTotalPrice = document.getElementById("totalPrice"); 
const cartImage = document.getElementById("itemsImg"); 



const local = JSON.parse(localStorage.getItem("cart"));  
let main = document.getElementById("cart__items");



// main.innerHTML = codeAll;

if(local != null) {

    let structure = [];

for(i = 0; i < local.length; i++) {


    cartImage.src = `${local[i][4]}`;

    cartName.textContent = `${local[i][0]}`;
    
    cartColor.textContent = `${local[i][2]}`;
    cartPrice.textContent = `${local[i][1]}` + " €";
    cartQuantity.value = `${local[i][3]}`;
    
    cartTotal.textContent = `${local[i][3]}`;
    cartTotalPrice.textContent = `${cartQuantity.value * local[i][1]}`;


    let codeAll = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img id ="itemsImg" src=${cartImage.src} alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2 >${cartName.textContent}</h2>
            <p >${cartColor.textContent}</p>
            <p >${cartPrice.textContent} </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p >Qté : </p>
              <input id="cartQuantity" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartQuantity.value}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p id="deleteItem" class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> ` ;
      
 

structure = structure + `${codeAll}`;



}
    if(i === local.length ) {
        main.innerHTML = structure;
    }

    for(let k = 0; k < local.length; k++) {
    let cartDelete = document.querySelectorAll(".deleteItem")[k]; 
    
    // cartDelete.addEventListener("click", local[k].splice(0, 1));
    // cartDelete.addEventListener("click", function() {console.log(local)});
    // cartDelete.addEventListener("click", function() {local.filter(function(){
    //     return local[k-1];
        
    // });
    // console.log(local[k][1])});

    
//     cartDelete.addEventListener("click", function() { local.shift()
      

// console.log(local)});

cartDelete.addEventListener("click", function() { delete local[k]
      

  console.log(local)});

  reload()

    
    let itemQuantity = document.querySelectorAll(".itemQuantity")[k];
    itemQuantity.addEventListener ("change", function() {
      console.log("test");
     cartTotalPrice.textContent = `${cartQuantity.value[k] * local[i][1]}`;
     cartTotal.textContent = cartQuantity.value + cartQuantity.textContent;
     })
    }
   
    
 } else {
console.log ("panier vide");
main.innerHTML = `<div> <p> Votre panier est vide </p> </div>`;
 }


const article = document.getElementById("cart__items");
// const cartName = document.getElementById("cartName");
// const cartColor = document.getElementById("cartColor");
// const cartPrice = document.getElementById("cartPrice");
// const cartQuantity = document.querySelectorAll(".itemQuantity");
const cartTotal = document.getElementById("totalQuantity");
const cartTotalPrice = document.getElementById("totalPrice");
const cartImage = document.getElementById("itemsImg");

let cart = JSON.parse(localStorage.getItem("cart"));
let main = document.getElementById("cart__items");

if (cart != 0) {
  let structure = [];

  for (i = 0; i < cart.length; i++) {
    cartImage.src = `${cart[i].image}`;

    cartName.textContent = `${cart[i].name}`;

    cartColor.textContent = `${cart[i].color}`;
    cartPrice.textContent = `${cart[i].price}` + " €";
    cartQuantity.value = `${cart[i].quantity}`;

    cartTotal.textContent = `${cart[i].quantity}`;
    // cartTotalPrice.textContent = `${cartQuantity.value * cart[i].price}`;

    let codeAll = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img id ="itemsImg" src=${cartImage.src} alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2 >${cartName.textContent}</h2>
            <p >${cartColor.textContent}</p>
            <p class="priceNew">${cartPrice.textContent} </p>
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
        <div>
        
        <div>


      </article> `;

    structure = structure + `${codeAll}`;
  }

  if (i === cart.length) {
    main.innerHTML = structure;
  }

  function totalQuantity1() {
    let arr = document.querySelectorAll(".itemQuantity");
    let tot = 0;
    for (let l = 0; l < arr.length; l++) {
      if (parseFloat(arr[l].value)) tot += parseFloat(arr[l].value);
    }
    console.log(tot);
    cartTotal.innerText = tot;
  }

  totalQuantity1();

  for (let k = 0; k < cart.length; k++) {
    console.log(cart[k]);
    let cartDelete = document.querySelectorAll(".deleteItem")[k];
    console.log("test");

    cartDelete.addEventListener("click", function () {
      const index = cart.indexOf(cart[k]);
      if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(index);
        window.location.reload();

        console.log(cart);
      }
    });

    let itemQuantity = document.querySelectorAll(".itemQuantity")[k];
    itemQuantity.addEventListener("change", function () {
      console.log("test");

      // quantity of the item in the cart
      const itemQuantity = document.querySelectorAll(".itemQuantity")[k].value;

      let numQuantity = Number(itemQuantity);

      console.log(numQuantity);

      //  multiply price
      let cartTotalPrice1 = `${numQuantity * cart[k].price}`;
      console.log(cartTotalPrice1);
      let priceNew = document.querySelectorAll(".priceNew")[k];
      priceNew.innerText = `${cartTotalPrice1}`;

      //   for (let j = 0; j < priceNew; j++) {

      //     let cartTotalPrice1 = `${numQuantity * cart[k].price}`;
      //   }
      //   console.log(cartTotalPrice1);
      //   cartTotal.innerText = tot;
      // }

      // total quantity

      function totalQuantity() {
        let arr = document.querySelectorAll(".itemQuantity");
        let tot = 0;
        for (let j = 0; j < arr.length; j++) {
          if (parseFloat(arr[j].value)) tot += parseFloat(arr[j].value);
        }
        console.log(tot);
        cartTotal.innerText = tot;
      }

      totalQuantity();
    });

    // cartTotalPrice.textContent = `${cartQuantity.cart[k] * cart[k].price}`;
  }
} else {
  console.log("panier vide");
  main.innerHTML = `<div> <p> Votre panier est vide </p> </div>`;
  cartTotal.innerText = "0";
}

// get elements from HTML
const main = document.getElementById("cart__items");
const cartTotal = document.getElementById("totalQuantity");
const cartTotalPrice = document.getElementById("totalPrice");

// get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart"));

function elementCartDisplay() {
  if (cart != null) {
    let structure = [];
    cart.forEach((element) => {
      fetch(`http://localhost:3000/api/products/${element.id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((product) => {
          let codeAll = `
        <article class="cart__item" data-id="${product.id}" data-color="${
            element.color
          }">
          <div class="cart__item__img">
            <img id ="itemsImg" src=${product.imageUrl} alt="">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2 >${product.name}</h2>
              <p >${element.color}</p>
              <p class="priceNew">${product.price * element.quantity} € </p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p >Qté : </p>
                <input id="cartQuantity" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
                  element.quantity
                }>
              </div>
              <div class="cart__item__content__settings__delete">
                <p id="deleteItem" class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
        `;
          structure += codeAll;
          main.innerHTML = structure;

          // Button change quantity

          for (let k = 0; k < cart.length; k++) {
            function changeQuantity() {
              let buttonChangeQuantity =
                document.querySelectorAll(".itemQuantity")[k];
              buttonChangeQuantity.addEventListener("change", function (e) {
                e.preventDefault();
                console.log("test button change quantity");
              });
            }
            changeQuantity();
          }

          // button delete
          for (let k = 0; k < cart.length; k++) {
            let cartDelete = document.querySelectorAll(".deleteItem")[k];
            cartDelete.addEventListener("click", function (e) {
              e.preventDefault();
              console.log("test delete button"); 
              console.log(element.quantity)
            });
          }

         console.log(cart)
       



















        });
    });
  } else {
    console.log("panier vide");
    main.innerHTML = `<div> <p> Votre panier est vide </p> </div>`;
    cartTotal.innerText = "0";
  }
}

elementCartDisplay();

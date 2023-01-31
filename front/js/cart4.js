// get elements from HTML
const main = document.getElementById("cart__items");
const cartTotal = document.getElementById("totalQuantity");
const cartTotalPrice = document.getElementById("totalPrice");

function saveBascket(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getBascket() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return []; //panier vide
  } else {
    return JSON.parse(cart);
  }
}

function getNumberProduct() {
  let cart = getBascket();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let cart = getBascket();
  let total = 0;
  for (let product of cart) {
    total += product.price * product.quantity;
  }
  return total;
}

// get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart != 0 && cart != null) {
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

        // button delete
        for (let k = 0; k < cart.length; k++) {
          let cartDelete = document.querySelectorAll(".deleteItem")[k];

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
        }
        // Button change quantity

        for (let i = 0; i < cart.length; i++) {
          let buttonChangeQuantity =
            document.querySelectorAll(".itemQuantity")[i];
          buttonChangeQuantity.addEventListener("change", function (e) {
            e.preventDefault();

            function changeQuantity(product, quantity) {
              let cart = getBascket(); //recupere le panier
              console.log(cart);
              let foundProduct = cart.find(
                (p) => (p.id == product.id) & (p.color == product.color)
              ); //verifie si le produit est deja dans le panier
              if (foundProduct != undefined) {
                foundProduct.quantity = Number(buttonChangeQuantity.value);
                console.log(buttonChangeQuantity.value);
                // window.location.reload();
                if (foundProduct.quantity <= 0) {
                  deleteProduct(foundProduct);
                } else {
                  saveBascket(cart);
                }
              }
            }
            changeQuantity(cart[i]);
            console.log(cart);
          });
        }

        // Total quantity
        function totalQuantity() {
          let totalQuantity = document.getElementById("totalQuantity");

          let cart = getBascket();
          let number = 0;
          for (let product of cart) {
            number += product.quantity;
          }
          totalQuantity.innerText = number;
        }
        totalQuantity();

        // Total Price
        function totalPrice() {
          let arr = document.querySelectorAll(".priceNew");

          let tot = 0;
          for (const element of arr) {
            let priceContent = element.textContent;
            let priceWithoutEuros = priceContent.slice(0, -2);
            if (Number(priceWithoutEuros)) tot += parseFloat(priceWithoutEuros);
          }
          cartTotalPrice.innerText = tot;
        }
        totalPrice();
      });
  });
} else {
  console.log("panier vide");
  main.innerHTML = `<div> <p> Votre panier est vide </p> </div>`;
  cartTotal.innerText = "0";
}


// Post
// Validation inputs
const validationFinal = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};


// Regex for mail
const regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

// error messages geted from html
const errorMessagesFirst = document.getElementById("firstNameErrorMsg");
errorMessagesFirst.textContent = "Veuillez introduire votre prénom !";
errorMessagesFirst.style.display = "none";

const errorMessagesLast = document.getElementById("lastNameErrorMsg");
errorMessagesLast.textContent = "Veuillez introduire votre nom !";
errorMessagesLast.style.display = "none";

const errorMessagesAddress = document.getElementById("addressErrorMsg");
errorMessagesAddress.textContent = "Veuillez introduire votre adresse !";
errorMessagesAddress.style.display = "none";

const errorMessagesCity = document.getElementById("cityErrorMsg");
errorMessagesCity.textContent = "Veuillez introduire votre ville !";
errorMessagesCity.style.display = "none";

const errorMessagesEmail = document.getElementById("emailErrorMsg");
errorMessagesEmail.textContent = "Veuillez introduire votre email !";
errorMessagesEmail.style.display = "none"; 

// form Data geted from html
const firsName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");


// validation inputs
function validationUser() {
    const inputs = [firsName, lastName, address, city, email];
    const errorMessages = [
        errorMessagesFirst,
        errorMessagesLast,
        errorMessagesAddress,
        errorMessagesCity,
        errorMessagesEmail,
    ];
    const conditions = [
        (input) => input.value.length < 2,
        (input) => input.value.length < 2,
        (input) => input.value.length < 5,
        (input) => input.value.length < 2,
        (input) => !regexEmail.test(input.value),
    ];
    inputs.forEach((input, index) => {
      if (conditions[index](input)) {
          errorMessages[index].style.display = "block";
          validationFinal[inputs[index].name] = false;
      } else {
          errorMessages[index].style.display = "none";
          validationFinal[inputs[index].name] = true;
      }
  });
} 

// form button
let formSubmit = document.getElementById("order");

// form submit with validation
formSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("test2");
    if (validationFinal.firstName === true && validationFinal.lastName === true && validationFinal.address === true && validationFinal.city === true && validationFinal.email === true) {
        console.log("test true validationFinal");
        
        // form infos
        let form = {
          firstName: firsName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
      } ;
        // const formPush = form.push({ contact: {
        //     firstName: firsName.value,
        //     lastName: lastName.value,
        //     address: address.value,
        //     city: city.value,
        //     email: email.value,
        // }});

    let formVariable;
    let productVariables;

      
   // Product infos
   const productPushCart = [];
   const productPush = cart.map((cart) => {
       productPushCart.push(
        cart.id
       );
   });



   
        
        productPush;
        console.log(formVariable);
        const commande = {
          formVariable,
          productVariables
      };
      console.log("{Contact:" + ("form", JSON.stringify(form)), "products:" + ("productPushCart", JSON.stringify(productPushCart) + "}"
      ) );
        // window.location.reload();

    } else {
        console.log("test false validationFinal"); 
        validationUser(); //display error messages
    }
  });


  // const commande = {
  //   contact: {
  //       firstName: "",
  //       lastName: "",
  //       address: "",
  //       city: "",
  //       email: email,
  //   },
  //   products: ["ghjdqsghjgdhjsgjhdqs", "gghjghjghjgjhgjh"],
  //   };
// get elements from HTML
const main = document.getElementById("cart__items"); 
const cartTotal = document.getElementById("totalQuantity");
const cartTotalPrice = document.getElementById("totalPrice");

// get cart from local storage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// get cart from local storage
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return []; //panier vide
  } else {
    return JSON.parse(cart);
  }
}

// add product to cart
function getNumberProduct() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  return number;
}
// add total price
function getTotalPrice() {
  let cart = getCart();
  let total = 0;
  for (let product of cart) {
    total += product.price * product.quantity;
  }
  return total;
}

//    button delete
function deleteItem() {
  let cart = getCart(); // get cart from local storage
  for (let k = 0; k < cart.length; k++) {
    let cartDelete = document.querySelectorAll(".deleteItem")[k];
    cartDelete.addEventListener("click", function () {
      const index = cart.indexOf(cart[k]);
      if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem("cart"));

        window.location.reload();
      }
    });
  }
}

// Total Price
function totalPrice() {
  let priceNew = document.querySelectorAll(".priceNew");

  let totalPrice = 0;
  for (const element of priceNew) {
    let priceContent = element.textContent;
    let priceWithoutEuros = priceContent.slice(0, -2);
    if (Number(priceWithoutEuros)) totalPrice += parseFloat(priceWithoutEuros);
  }

  cartTotalPrice.innerText = totalPrice;
  console.log(priceNew);
}


  totalPrice();

// Button change quantity
function changeQuantity() {
  let cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    let buttonChangeQuantity = document.querySelectorAll(".itemQuantity")[i];
    buttonChangeQuantity.addEventListener("change", function (e) {
      e.preventDefault();
      function changeQuantity(product, quantity) {
        let cart = getCart(); //recupere le panier
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
            saveCart(cart);
          }
        }
      }
      changeQuantity(cart[i]);
      console.log(cart);
      getNumberProduct();
      cartTotal.innerText = getNumberProduct();
      totalPrice();
      getHtmlCode();
    });
  }
}

// Total quantity
function totalQuantity() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  totalQuantity.innerText = number;
}

// Add html code on the page
function getHtmlCode() {
  let cart = getCart();

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
        deleteItem();
        changeQuantity();
        cartTotal.innerText = getNumberProduct();

        totalPrice();
      });
  });
}
let cart = getCart();

// If cart is empty
if (cart != 0 && cart != null) {
  getHtmlCode();

  totalPrice();

  totalQuantity();
} else {
  console.log("panier vide");
  main.innerHTML = `<div> <p> Votre panier est vide </p> </div>`;
  cartTotal.innerText = "0";
}


// Post
// Validation inputs
const validationFinal = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};

// Regex for mail name and address
const regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const regexName = /^[A-Za-z]+$/;
const regexAddress = /^[A-Za-z0-9]+$/;


// error messages gotten from html
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

// form Data gotten from html
const firsName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// validation inputs
function validationUser() {
    const inputs = [firsName, lastName, address, city, email];
    const errorMessages = [ // error messages gotten from html
        errorMessagesFirst,
        errorMessagesLast,
        errorMessagesAddress,
        errorMessagesCity,
        errorMessagesEmail,
    ];
    const conditions = [ // conditions for validation
        (input) => !regexName.test(input.value) || input.value.length < 2,
        (input) => !regexName.test(input.value) || input.value.length < 2,
        (input) => !regexAddress.test(input.value) || input.value.length < 2,
        (input) => !regexName.test(input.value) || input.value.length < 2,
        (input) => !regexEmail.test(input.value),
    ];
    inputs.forEach((input, index) => { // loop for validation
        if (conditions[index](input)) {
             errorMessages[index].style.display = "block";
            validationFinal[inputs[index].name] = false;
        }
        else if (input.value == "") { // if input is empty
            errorMessages[index].style.display = "block";
            validationFinal[inputs[index].name] = false;
        } else {
           
errorMessages[index].style.display = "none"; // if input is valid
            validationFinal[inputs[index].name] = true;
        }
    });
}

// form button
let formSubmit = document.getElementById("order");

// form submit with validation
formSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    validationUser() ;
    // contact infos
    let contact = {
        firstName: firsName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };
    console.log("test2");
    if ( // if all inputs are valid
        validationFinal.firstName &&
        validationFinal.lastName &&
        validationFinal.address &&
        validationFinal.city &&
        validationFinal.email
    ) {
        console.log("test true validationFinal");
        // get products id
        const productsId = [];
        cart.map((product) => {
            productsId.push(product.id);
        });
        // order object
        const order = {
            'contact': contact,
            'products': productsId,
        };

        console.log("order", JSON.stringify(order));

        // POST Method
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" },
        };
        let url = "http://localhost:3000/api/products/order";
        fetch(url, options) // fetch method
            .then((res) => res.json())
            .then((data) => {
                console.log("data", order);
                localStorage.setItem("orderId", data.orderId);
                document.location.href = "confirmation.html";
            });
    } else {
        event.preventDefault();
        console.log("test false validationFinal");
        validationUser(); //display error messages
    }
});

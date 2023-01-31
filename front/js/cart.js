// get elements from HTML

const article = document.getElementById("cart__items");
let main = document.getElementById("cart__items");

const cartTotal = document.getElementById("totalQuantity");
const cartTotalPrice = document.getElementById("totalPrice");
const cartImage = document.getElementById("itemsImg");

// get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart"));

// loop to regenerate elements
if (cart != 0) {
    let structure = [];
    /*
    cart.forEach((product) => {
        let productColor = product.color
        ici => fetch vers url + product.id
    });
*/
    for (i = 0; i < cart.length; i++) {
        let cartImage = cart[i].image;
        let cartName = cart[i].name;
        let cartColor = cart[i].color;
        let cartPrice = cart[i].price;
        let cartQuantity = cart[i].quantity;

        let codeAll = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img id ="itemsImg" src=${cartImage} alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2 >${cartName}</h2>
            <p >${cartColor}</p>
            <p class="priceNew">${cartPrice * cartQuantity} € </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p >Qté : </p>
              <input id="cartQuantity" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartQuantity}>
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

    //   put the loop in HTML
    if (i === cart.length) {
        main.innerHTML = structure;
    }
    // function totalPrice (before change)
    function totalPrice() {
        let arr = document.querySelectorAll(".priceNew");

        let tot = 0;
        for (const element of arr) {
            let priceContent = element.textContent;
            let priceWithoutEuros = priceContent.slice(0, -2);
            if (Number(priceWithoutEuros)) tot += parseFloat(priceWithoutEuros);
        }
        console.log(tot);
        cartTotalPrice.innerText = tot;
    }

    totalPrice();

    // quantity of the item in the cart (before change)

    function totalQuantity() {
        let arr = document.querySelectorAll(".itemQuantity");
        let tot = 0;
        for (const element of arr) {
            if (parseFloat(element.value)) tot += parseFloat(element.value);
        }
        console.log(tot);
        cartTotal.innerText = tot;
    }

    totalQuantity();

    // delete item from cart

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

            // quantity of the item in the cart (after change)
            const itemQuantity =
                document.querySelectorAll(".itemQuantity")[k].value;

            let numQuantity = Number(itemQuantity);

            console.log(numQuantity);

            //  multiply price (after change)
            let cartTotalPrice1 = `${numQuantity * cart[k].price}`;
            console.log(cartTotalPrice1);
            let priceNew = document.querySelectorAll(".priceNew")[k];
            priceNew.innerText = `${cartTotalPrice1} €`;

            //totalQuantity (after change)
            totalQuantity();
            //totalPrice (after change)
            totalPrice();
        });
    }
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

// Error messages Form

// const errorMessages = document.querySelectorAll(".cart__order__form__question p");

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

// form Data
const userName = document.getElementById("firstName");
const userLastName = document.getElementById("lastName");
const userAddress = document.getElementById("address");
const userCity = document.getElementById("city");
const userEmail = document.getElementById("email");

// validation inputs
function validationUser() {
    const inputs = [userName, lastName, address, city, userEmail];
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

let formSubmit = document.getElementById("order");
formSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("test2");
    if (validationUser === true) {
        console.log("test3");
    } else {
        console.log("test4");
    }
    //// validation infos
    if (
        validationFinal.firstName === true &&
        validationFinal.lastName === true &&
        validationFinal.address === true &&
        validationFinal.city === true &&
        validationFinal.email === true
    ) {
        console.log("tu peux envoyer le formulaire");

        // Product infos
        const productPushCart = [];
        const productPush = cart.map((item) => {
            productPushCart.push({
                ID: item.id,
                Color: item.color,
                Quantity: item.quantity,
                Price: item.price,
            });
        });

        // form infos
        const form = [];
        const formPush = form.push({
            firstName: userName.value,
            lastName: userLastName.value,
            address: userAddress.value,
            city: userCity.value,
            email: userEmail.value,
        });

        localStorage.setItem("form", JSON.stringify(form));
        localStorage.setItem(
            "productPushCart",
            JSON.stringify(productPushCart)
        );

        formPush;
        productPush;
        console.log(form);
        console.log(productPushCart);
        // window.location.reload();
    } else {
        console.log("le formulaire n'est pas complet");
    }
});
// POST Method

// let url = "http://localhost:3000/api/products";
// let response = await fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(form)
// });

// let result = await response.json();
// alert(result.message);

// function validationUser2() {
//   if (validationFinal.firstName === true && validationFinal.lastName === true && validationFinal.address === true && validationFinal.city === true && validationFinal.email === true)
//   {      console.log("test validationFinal");
// }    else {console.log("test validationFinal2")}
// }
//   validationUser2();

const commande = {
    contact: {
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        email: string,
    },
    products: ["ghjdqsghjgdhjsgjhdqs", "gghjghjghjgjhgjh"],
};

// get id from url
const params = new URLSearchParams(document.location.search);
const localId = params.get("id");

// get product from api
function productsItems() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (products) {
      // create loop items
      products.forEach((product) => {

        if (product._id === localId) {
          const nameId = document.getElementById("title"); // title
          const priceId = document.getElementById("price"); // price
          const idDescription = document.getElementById("description"); // description
          const colorId = document.getElementById("colors"); // colors
          let imageId = document.querySelector(".item__img"); // image
          let itemsImg = document.createElement("img"); // put image
          itemsImg.src = product.imageUrl; // put image link
          itemsImg.alt = product.altTxt; // put image alt
          imageId.appendChild(itemsImg); 
          {// add product 
            nameId.textContent = product.name;
            priceId.textContent = product.price;
            idDescription.textContent = product.description;
            // add colors in select
            let listNew = product.colors;
            listNew.forEach((item, key) => {
              colorId[key] = new Option(item, key);
            });
            // add cart
            const cartId = document.getElementById("addToCart");
            // add quantity
            const elementQuantity = document.getElementById("quantity");
            // add cart event listener
            cartId.addEventListener("click", function () {
              let selectedElement = colorId.selectedIndex;
              if (elementQuantity.value > 0) {
                const cart = JSON.parse(localStorage.getItem("cart")) ?? []; // get cart from local storage

                // condition to add same id & color
                let foundProduct = cart.find(
                  (p) =>
                    p.id == product._id && p.color == listNew[selectedElement]
                );
                if (foundProduct != undefined) { // if product exists in cart
                  foundProduct.quantity++;
                  alert("Produit existant, quantité augmentée");
                } else {
                  cart.push({ // if product doesn't exist in cart
                    id: product._id,
                    color: listNew[selectedElement],
                    quantity: Number(elementQuantity.value),
                  });
                  alert("Produit ajouté au panier");
                }
                localStorage.setItem("cart", JSON.stringify(cart)); // set cart in local storage
                console.log(cart);
              }
            });
          }
        }
      });
    });
}


productsItems();

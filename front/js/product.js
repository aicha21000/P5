// const local = JSON.parse(localStorage.getItem("product"));
const params = new URLSearchParams(document.location.search);
const localId = params.get("id");

// teeeeeeeeeeeeeeeeeest

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
        // localStorage.setItem("product", JSON.stringify(product));

        // add colors

        if (product._id === localId) {
          const nameId = document.getElementById("title");
          const priceId = document.getElementById("price");
          const idDescription = document.getElementById("description");
          const colorId = document.getElementById("colors");
          let imageId = document.querySelector(".item__img");
          let itemsImg = document.createElement("img");
          itemsImg.src = product.imageUrl;
          itemsImg.alt = product.altTxt;
          imageId.appendChild(itemsImg);
          {
            nameId.textContent = product.name;
            priceId.textContent = product.price;
            idDescription.textContent = product.description;
            let listNew = product.colors;

            listNew.forEach((item, key) => {
              colorId[key] = new Option(item, key);
            });
            // add cart
            const cartId = document.getElementById("addToCart");

            const elementQuantity = document.getElementById("quantity");

            cartId.addEventListener("click", function () {
              let selectedElement = colorId.selectedIndex;
              if (elementQuantity.value > 0) {
                const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

                // condition to add same id & color
                let foundProduct = cart.find(
                  (p) =>
                    p.id == product._id && p.color == listNew[selectedElement]
                );
                if (foundProduct != undefined) {
                  foundProduct.quantity++;
                  alert("Produit existant, quantité augmentée");
                } else {
                  cart.push({
                    id: product._id,
                    color: listNew[selectedElement],
                    quantity: Number(elementQuantity.value),
                  });
                  alert("Produit ajouté au panier");
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log(cart);
              }
            });
          }
        }
      });
    });
}
// teeeeeeeeeeeeeeeeeeeeeest

productsItems();

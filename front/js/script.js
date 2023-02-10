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
        // create element anchor
        let itemsSection = document.getElementById("items");
        const itemsAnchor = document.createElement("a");
        itemsAnchor.setAttribute("href", "./product.html?id=" + product._id);

        itemsSection.appendChild(itemsAnchor);
        //                 itemsAnchor.onclick = () => {

        //                 localStorage.setItem("product", JSON.stringify(product));
        // }
        // create element article
        let itemsArticle = document.createElement("article");
        itemsAnchor.appendChild(itemsArticle);

        // create element img
        let itemsImg = document.createElement("img");

        itemsImg.src = product.imageUrl;
        itemsImg.alt = product.altTxt;
        itemsArticle.appendChild(itemsImg);

        // create element h3
        let itemsH3 = document.createElement("h3");
        itemsH3.innerText = product.name;
        itemsH3.classList.add("productName");
        itemsArticle.appendChild(itemsH3);

        // create element p
        let itemsP = document.createElement("p");
        itemsP.classList.add("productDescription");
        itemsP.innerText = product.description;
        itemsArticle.appendChild(itemsP);
      });
    })
    .catch(function (err) {
      // Une erreur est survenue
      console.log(err);
    });
}
productsItems();

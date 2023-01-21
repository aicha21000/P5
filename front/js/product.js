// const local = JSON.parse(localStorage.getItem("product"));
const params = new URLSearchParams(document.location.search);
const local = params.get("id");



// teeeeeeeeeeeeeeeeeest


function productsItems() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(products) {
            
            // create loop items
            products.forEach(product => {
            // localStorage.setItem("product", JSON.stringify(product));
            


            
            
            // add colors
            
            if (product._id === local) {
            const nameId = document.getElementById("title");
            const priceId = document.getElementById("price");
            const idDescription = document.getElementById("description");
            const colorId = document.getElementById("colors");
            let imageId = document.getElementById("itemsImg");
            {nameId.textContent = `${product.name}`;
            priceId.textContent = `${product.price}`;
            idDescription.textContent = `${product.description}`;
            imageId.src = `${product.imageUrl}`;
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
                        
                        const cart = JSON.parse(localStorage.getItem('cart')) ?? [];
                        
                        cart.push({
                            id: product._id,
                            name: product.name,
                            color: listNew[selectedElement],
                            quantity: elementQuantity.value,
                            price: product.price,
                            image: product.imageUrl,
                        });
                         localStorage.setItem("cart", JSON.stringify(cart));
                        console.log(cart);
                       
                    }
                });
            };
            
        }})})}
// teeeeeeeeeeeeeeeeeeeeeest
        






        productsItems()
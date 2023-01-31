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
function addBasket(product) {
  let cart = getBascket(); //recupere le panier
  let foundProduct = cart.find(p => p.id == product.id ); //verifie si le produit est deja dans le panier
  if (foundProduct != undefined) {
    //si le produit est deja dans le panier
    foundProduct.quantity++; //augmente la quantité
  } else {
    product.quantity = 1; //sinon ajoute la quantité
    cart.push(product); //ajoute le produit au panier
  }
  saveBascket(cart); //sauvegarde le panier
}

function deleteProduct(product) {
    let cart = getBascket();
    cart = cart.filter(p => p.id != product.id );
    saveBascket(cart);
}

function changeQuantity(product, quantity) {
    let cart = getBascket(); //recupere le panier
    let foundProduct = cart.find(p => p.id == product.id ); //verifie si le produit est deja dans le panier
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            deleteProduct(foundProduct);
        }else {
            saveBascket(cart);
        }
    } 
}

function getNumberProduct() {
    let cart = getBascket();
    let number = 0;
    for(let product of cart){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let cart = getBascket();
    let total = 0;
    for(let product of cart){
        total += product.price * product.quantity;
    }
    return total;
}


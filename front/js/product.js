// main();

// function main() {
//     productsItems();
// }

// function productsItems() {
//     fetch('http://localhost:3000/api/products/')
//     .then(function(res) {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then(function(value) {
        
//         const products = value;
//         const id = window.location.toString();
//         // const stringUrl = id.toString();
//         console.log(id);
        
//         let pText = id.slice(52)
//         console.log(pText);
        
      

        
const idName = document.getElementById("id1"); 
        if(localStorage.getItem("_id") != null)
        idName.textContent = `the id is ${localStorage.getItem("_id")}`;
        console.log(idName);


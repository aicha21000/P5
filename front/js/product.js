const local = JSON.parse(localStorage.getItem("product"));
const nameId = document.getElementById("title"); 
const priceId = document.getElementById("price");
const idDescription = document.getElementById("description"); 

const colorId = document.getElementById("colors");




listNew = local.colors;
listNew.forEach((item, key)=>{
        colorId[key] = new Option(item, key); 
      }) 

if(local != null) 
        nameId.textContent = `${local.name}`;
        priceId.textContent = `${local.price}`;
        idDescription.textContent = `${local.description}`;

        



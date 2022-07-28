//Recuperation des id dans l'Url 
let urlParams= new URLSearchParams(window.location.search);
// console.table(window.location)
let productId = urlParams.get("id");
let product = "";

//Variable globales des éléments du DOM
let imgProduct = document.querySelector(".item__img");
let titleProduct = document.getElementById("title");
let descriptionProduct = document.getElementById("description");

let colorProduct = document.getElementById("colors");
let price = document.getElementById("price");
let quantityProduct = document.getElementById("quantity");


 // Appel à API pour récuperer les données
    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    
    .then ((products) => {
        // console.table(products)
        loadProduct(products);
       
    })

    .catch((error) => {
        alert("Erreur de la requête API");
    });

//Chargement des éléments dans le DOM avec la méthode Templating lateral
function loadProduct (product){
    imgProduct.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    titleProduct.textContent = `${product.name}`
    price.textContent = `${Number(product.price)}`
    descriptionProduct.textContent = `${product.description}`
    const colorArray = product.colors
        for (let color of colorArray) {
            colorProduct.innerHTML += `<option value="${color}">${color}</option>`
        } 
};

clickBtn();

//Fonction de gestion de l'ajoute au panier au click du bouton
function clickBtn(){
    let btnAddToCart = document.getElementById("addToCart");
    
    btnAddToCart.addEventListener("click", (e) =>{
        e.preventDefault() 
        if(colorProduct.value === "" || quantity.value == null || quantity.value <= 0 ) {
            alert("Choississez une couleur et une quantité !");
        } else if (quantity.value > 0 && quantity.value <= 100){
            // objet à envoyer dans le LocalStorage
            const optionProducts = {
                id: productId,          
                color: colorProduct.value,
                quantity: quantity.value,                
            }
            addToCart(optionProducts);         
            window.confirm(`${quantityProduct.value} ${document.getElementById("title").textContent} ${colorProduct.value} a été ajouté au panier` );
                //  window.location.href = "index.html"

        } else if (quantityProduct.value > 100) {
            alert("Desolé vous ne pouvez pas commander plus de 100 articles par commande");
        }
          
    });

}

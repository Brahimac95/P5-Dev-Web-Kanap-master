//RECUPERATION DE L'ID ET PARAMETRE D'UN PRODUIT DANS L'URL

let urlParams= new URLSearchParams(document.location.search); // paramètres du produit
// console.table(window.location)
let productId = urlParams.get("id");

//Variable globales des éléments du DOM
let imgProduct = document.querySelector(".item__img");
let titleProduct = document.getElementById("title");
let descriptionProduct = document.getElementById("description");

let colorProduct = document.getElementById("colors");
let price = document.getElementById("price");
let quantityProduct = document.getElementById("quantity");

let product = "";

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

//Fonction de gestion de l'ajout au panier au click du bouton
function clickBtn(){
    let btnAddToCart = document.getElementById("addToCart");
    //Ecoute du bouton "Ajouter au panier"
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
            //Fonction présente dans le fichier basket.js
            addToCart(optionProducts);         
            window.confirm(`${quantityProduct.value} ${document.getElementById("title").textContent} ${colorProduct.value} a été ajouté au panier`);
            // Redirection vers la page panier
            window.location.href = "cart.html"

        } else if (quantityProduct.value > 100) {
            alert("Desolé vous ne pouvez pas commander plus de 100 articles par commande");
        }
          
    });

}


//===INSERTION DES PRODUITS DANS LA PAGE D'ACCUEIL===//
insertionProduct();

function insertionProduct(){
    // Appel à l'API
    fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products =>{
        console.table(products)
        // Je crée une chaîne vide qui contiendra toutes les cards
        let listCardDom = "";

        for(let product of products){ 
            // J'ajoute les cards une par une dans listCardDom
            listCardDom += ` <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
            </a> `;
        }
        // Je met cette chaîne après la boucle for,  pour que ça ne soit modifier d'une seule fois avec tout le contenu
        document.querySelector("#items").innerHTML = listCardDom;
    }) 
    .catch((error) =>{
        alert("Le serveur ne repond pas")
    })
    
    .catch((error) =>{
        alert("Le produit n'est pas accessible")
    })
}
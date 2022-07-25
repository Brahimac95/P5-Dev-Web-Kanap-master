//=========================BASKET LOCALSTORAGE==========================//


// //Fonction de sauvegarde du panier dans le localStorage en sérialisant les données avec JSON.stringify
function saveProducts(products){
    localStorage.setItem("productCart", JSON.stringify(products))
}

// Fonction de récupération des produits dans le localStorage en faisant l'inverse c'est à dire déserialiser avec JSON.parse
function getProducts(){
    let products = localStorage.getItem("productCart");
    if(products == null){
        return []
    } else{
        return JSON.parse(products)
    }
    
}


//Ajouter un produit dans le panier ou augmenter sa quantité s'il est déjà present avec la même couleur dans le Ls
function addToCart(product){
    let products = getProducts();
      //find va permettre de chercher un élément dans un tableau verifie si cet élement existe déjà , et je l'utilise ici pour ne pas créer de doublon lors d'ajout des produit dans le panier
    let foundProduct = products.find(p => p.id == product.id && p.color == product.color);
    if(foundProduct != null){
        let newQuantity = Number(parseInt(foundProduct.quantity) + parseInt(product.quantity));
        foundProduct.quantity = newQuantity;
        
    } else{
        products.push(product)        
    }
    saveProducts(products);
}


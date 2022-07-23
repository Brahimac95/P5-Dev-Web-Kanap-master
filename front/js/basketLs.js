
//=========================BASKET LOCALSTORAGE==========================//


// //Fonction de sauvegarde du panier dans le localStorage
function saveProducts(products){
    localStorage.setItem("productCart", JSON.stringify(products))
}

// Fonction de récupération des produits dans le localStorage
function getProducts(){
    let products = localStorage.getItem("productCart");
    if(products == null){
        return []
    } else{
        return JSON.parse(products)
    }
    
}


//Ajouter un produit dans le panier ou augmenter sa quantité s'il est déjà present avec le même id et la même couleur das le Ls
function addToCart(product){
    let products = getProducts();
      //find va permettre de chercher un élément dans un tableau verifie si cet élement existe déjà , et je l'utilise ici pour ne pas creer de doublon lors d'ajout des produit dans le Ls
    let foundProduct = products.find(p => p.id == product.id && p.color == product.color);
    if(foundProduct != null){
        let newQuantity = Number(parseInt(foundProduct.quantity) + parseInt(product.quantity));
        foundProduct.quantity = newQuantity;
        
    } else{
        products.push(product)        
    }
    saveProducts(products);
}


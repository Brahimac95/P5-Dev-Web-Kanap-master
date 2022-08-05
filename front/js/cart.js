
//Variables Globales
let kanapArray = []; // Contiendra les données réçu par l'API
let itemslocalStorage = []; // Contiendra les données du localStorage
let cartItems = document.getElementById("cart__items");
let totalArticles = 0;
let totalPrices = 0;

//Variable globales des totaux lorsque le panier est vide
let totalArticle = 0;
let totalPrice = 0; 


cartStatus();
//Si le panier est vide on affiche un message comme quoi "le panier est vide" ou sinon appel des fonctions pour afficher la liste des produits présents
function cartStatus(){
    if(localStorage.getItem("productCart") === null || JSON.parse(localStorage.getItem("productCart")).length < 1){
        const emptyCart = "Votre panier est vide"
        document.querySelector("h1").textContent = emptyCart;
        const totalArticle = "0";
        const totalPrice = "0";
        document.getElementById("totalQuantity").textContent = totalArticle;
        document.getElementById("totalPrice").textContent = totalPrice;
    } else{
        getProduct();
        getFetch();
        totalNumberArticle();
    }
}

// //Enregistrement du panier dans le localStorage
function saveProduct(){
    localStorage.setItem("productCart", JSON.stringify(itemslocalStorage));
}

//Fonction de récupération de produits stocké dans le Ls
function getProduct(){
    itemslocalStorage = JSON.parse(localStorage.getItem("productCart"));
}

//Recupération des données de l'API et afficher les élements du Ls dans le panier
function getFetch(){
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(productData => {
        kanapArray = productData;
        //Méthode forEach + la méthode find pour faire correspondre les produits grâce leurs id
        itemslocalStorage.forEach((itemInLocalStorage) => {
            const allItems = kanapArray.find((data) => data._id == itemInLocalStorage.id);
            //Création et insertion du contenu du Dom en affichant les éléments du Ls
            cartItems.innerHTML += `<article class="cart__item" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.color}">
            <div class="cart__item__img">
              <img src="${allItems.imageUrl}" alt="${allItems.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${allItems.name}</h2>
                <p>${itemInLocalStorage.color}</p>
                <p>${allItems.price}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;

          //Calcul du prix total de produit dans le panier
          totalPrices += itemInLocalStorage.quantity * allItems.price
          document.getElementById("totalPrice").textContent = totalPrices ;
            //Appel des 2 fonctions après chargement des données de l'API
            changeQuantity()
            deleteArticle()

        });


        
    })
    .catch((error) =>{
        // console.log("Erreur")
        alert("Les produits ne sont pas disponible dû a une erreur")
    })
}

//Calcul du nombre total d'article dans le panier
function totalNumberArticle(){
    getProduct()
    for(let product of itemslocalStorage){
        totalArticles += Number(product.quantity)// Number pour ne pas avoir de concatenation 
    }//Puis on insère dans le Dom
    document.getElementById("totalQuantity").textContent = totalArticles;
}


let itemQuantiy = document.getElementsByClassName("itemQuantity")

//Ecoute et prise en compte des nouvelles quantité après changement
function changeQuantity(){
    //1ere boucle sur les inputs pour écouter des changements en fonction de l'id et la color
    for(let index = 0; index < itemQuantiy.length; index++) {
        let element = itemQuantiy[index];
        element.addEventListener("change",(e) =>{
            //element.closest nous permet ici de cibler que l'élément que l'on souhaite modifier grâce à son id et sa couleur
            id = element.closest("[data-id]").dataset.id;//Avec dataset on accède aux valeur des deux attributs 
            color = element.closest("[data-color]").dataset.color;
            // Quand le visiteur choisi une quantité négative ou plus de 100 articles lors de la modification de la quantité dans le panier
             if(e.target.value < 0){
                alert("La quantité du produit ne peut pas être négative, veuillez choisir une autre quantié. ")               
            } else if(e.target.value > 100){
                alert("La quantité ne doit pas être supérieure à 100, veuillez choisir une autre quantité. ")
            } else {
                //2e boucle pour donner une la nouvelle valeur au Ls puis l'enregister
                for(let i = 0; i < itemslocalStorage.length; i++) {
                    if(id === itemslocalStorage[i].id && color === itemslocalStorage[i].color && e.target.value <= 100) {
                        itemslocalStorage[i].quantity = e.target.value;
                        saveProduct()//On enregistre le panier dans le Ls
                        document.location.reload();
                    }
                }
            }
        });
    }
}

//Supprimer un article du panier
function deleteArticle(){
    let deleteItem = document.getElementsByClassName("deleteItem");
    for(let i = 0; i < deleteItem.length; i++) {
        //Ecoute du bouton supprimer
        deleteItem[i].addEventListener("click", (event) => {
            event.preventDefault();
            //.splice permet d'ajouter ou supprimer un élément dans un [], dans notre cas il supprime que l'élément ou le bouton a été actionné 
            itemslocalStorage.splice([i], 1)// supprimer 1 élément à partir de l'index i
            document.location.reload()
            saveProduct()
        })
    }
}
    

//========================================FORMULAIRE==================================================//


//Variables globales
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


//Variable globale regExp( Expressions regulières)
let regExpName = new RegExp(/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/);
let regExpAddress = new RegExp(/^[a-zA-Z0-9\s-',]+$/);

//Ecoute le changement et la validation des champs du formulaire
firstName.addEventListener("change", () => {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")

    if(regExpName.test(firstName.value)){
        firstNameErrorMsg.textContent = "Prénom validé"

    } else{
        firstNameErrorMsg.innerHTML="Prénom non valide"
    }   
         
});
lastName.addEventListener("change", () => {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

    if(regExpName.test(lastName.value)){
        lastNameErrorMsg.textContent = " Nom validé "

    } else{
        lastNameErrorMsg.innerHTML ="Nom non valide"
    }   
         
});
address.addEventListener("change", () => {
    let addressErrorMsg = document.getElementById("addressErrorMsg")

    if(regExpAddress.test(address.value)){
        addressErrorMsg.textContent = "Adresse validé"
       
    } else{
        addressErrorMsg.innerHTML ="Adresse non valide"
    }   

});
city.addEventListener("change", () => {
    let cityErrorMsg = document.getElementById("cityErrorMsg")

    if(regExpName.test(city.value)){
        cityErrorMsg.textContent = "Ville validé"

    } else{
        cityErrorMsg.innerHTML ="Ville non valide"
    }         
})

let regExpEmail =  new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
email.addEventListener("change",() =>{
    let emailErrorMsg = document.getElementById("emailErrorMsg")

    if(regExpEmail.test(email.value)){
        emailErrorMsg.textContent = "Email Valide";

    } else {
        emailErrorMsg.innerHTML = "Email non valide";
    }
    
})


//=====REQUETE POST DU FORMULAIRE À L'API====//

let order = document.getElementById("order");
// Ecoute du clic sur le bouton "Commander" et création de l'objet contact
order.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  // Si le panier est vide ou si l'un des champs du formulaire est mal renseigné ou vide => alerte ou le inactivité du bouton
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    address.value == "" ||
    city.value == "" ||
    email.value == ""
  ) {
    // order.disabled = false
    alert("Un des champs du formulaire n'est pas completé ");
  } else if (localStorage.getItem("productCart") === null || JSON.parse(localStorage.getItem("productCart")).length < 1) {
    alert(
      "Votre panier est vide! Merci choisir des articles avant de passer commande."
    );
  } else if (
    regExpName.test(firstName.value) == false ||
    regExpName.test(lastName.value) == false ||
    regExpAddress.test(address.value) == false ||
    regExpName.test(city.value) == false ||
    regExpEmail.test(email.value) == false
  ) {
    alert("Un des champs du formulaire n'est pas valide !");
  } else {
        //Tableau qui contiendra les donnée du Ls par une vérification grâce à l'id
        let products = [];
        itemslocalStorage.forEach((order) => {
        products.push(order.id);
        });
        //Je crée un objet qui aura les données du formulaire et les données du storage
        let orderConfirm = { contact, products };

        // Appel à l'API et envoie de l'objet en JSON au serveur avec fetch
        fetch("http://localhost:3000/api/products/order", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderConfirm),
        })
        .then((response) => response.json())
        .then((data) => {
            //j'ajoute l'id de commande dans l'url de la page de confirmation
            window.location.href = "./confirmation.html?orderId=" + data.orderId;
            // on vide le LocalStorage
            window.localStorage.clear();
        })
        .catch((error) => {
            alert(
            "Commande invalide, merci de réessayer plus tard"
            );
        });
    }
});

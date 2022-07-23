
//Variables Globales
let kanapArray = [];
let itemslocalStorage = [];
let cartItems = document.getElementById("cart__items");
let totalArticle = 0;
let totalPrice = 0;
//Variable globales des totaux quand le panier est vide
let totalPrices = 0
let totalArticles = 0

//Si le panier est vide on afficher un message ou sinon appel des fonctions pour afficher la liste des produits presents
if(localStorage.getItem("productCart") === null || JSON.parse(localStorage.getItem("productCart")).length < 1){
    const emptyCart = "Votre panier est vide"
    document.querySelector("h1").textContent = emptyCart;
    const totalArticles = "0";
    const totalPrices = "0";
    document.getElementById("totalQuantity").textContent = totalArticles;
    document.getElementById("totalPrice").textContent = totalPrices;
} else{
    getProduct();
    getFetch()
    totalNumberArticle()

}

// //Enregistrement du panier dans le localStorage
function saveProduct(){
    localStorage.setItem("productCart", JSON.stringify(itemslocalStorage))
}

//Recupération les produits stocké dans le Ls
function getProduct(){
    itemslocalStorage = JSON.parse(localStorage.getItem("productCart"));
}

//Recupération des données de l'API et afficher les élements du Ls
function getFetch(){
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(productData => {
        kanapArray = productData;
        //Boucle + la méthode find pour faire correspondre les produit grâce leurs id
        itemslocalStorage.forEach((itemInLocalStorage) =>{
            const allItems = kanapArray.find((data) => data._id == itemInLocalStorage.id);
            //Creation et insertion du contenu du Dom en affichant les éléments du Ls
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
          totalPrice += itemInLocalStorage.quantity * allItems.price
          document.getElementById("totalPrice").textContent = totalPrice ;
            //Appel des fonctions après chargement des données de l'API
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
        totalArticle += Number(product.quantity)
    }
    document.getElementById("totalQuantity").textContent = totalArticle;
}

//Ecoute et prise en compte des nouvelles quantité après changement
let btnQuantiy = document.getElementsByClassName("itemQuantity")
function changeQuantity(){
    //1ere boucle sur les inputs pour ecouter des changements en fonction de l'id et le color
    for(let index = 0; index < btnQuantiy.length; index++) {
        let el = btnQuantiy[index];
        el.addEventListener("change",(e) =>{
            id = el.closest("[data-id]").dataset.id;
            color = el.closest("[data-color]").dataset.color;
            //Quand le visiteur choisi plus de 100 article dans le input
            if(e.target.value > 100){
                alert("La quantité ne doit pas depasser 100, veuillez choisir une autre quantité.")
            }
            //2e boucle pour donner une la nouvelle valeur au Ls puis l'enregister
            for(let i = 0; i < itemslocalStorage.length; i++) {
                if(id === itemslocalStorage[i].id && color === itemslocalStorage[i].color && e.target.value <= 100) {
                    itemslocalStorage[i].quantity = e.target.value;
                    saveProduct()//Pour enregistrer le panier
                    location.reload();

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
            itemslocalStorage.splice([i], 1)
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


//Vrarible globale regExp
let regExpName = new RegExp(/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/);
let regExpAddress = new RegExp(/^[a-zA-Z0-9\s-',]+$/);

//Ecoute le changement et la validation des champs du formulaire
firstName.addEventListener("change", () => {
    let p = document.getElementById("firstNameErrorMsg")

    if(regExpName.test(firstName.value)){
        p.textContent = "Prenom validé"
        p.style.color ="green"
        // firstName.style.border = "1px solid #0be45b"

    } else{
        p.innerHTML="Prenom non valide"
    }   // firstName.style.border = " 1px solid #ed3832"
        
   
});
lastName.addEventListener("change", () => {
    let p = document.getElementById("lastNameErrorMsg")

    if(regExpName.test(lastName.value)){
        p.textContent = " Nom validé "
        p.style.color ="green"
        // firstName.style.border = "1px solid #0be45b"

    } else{
        p.innerHTML ="Nom non valide"
    }   // firstName.style.border = " 1px solid #ed3832"
        
   
});
address.addEventListener("change", () => {
    let p = document.getElementById("addressErrorMsg")

    if(regExpAddress.test(address.value)){
        p.textContent = "Adresse validé"
        p.style.color ="green"
        // firstName.style.border = "1px solid #0be45b"

    } else{
        p.innerHTML ="Adresse non valide"
    }   // firstName.style.border = " 1px solid #ed3832"
        
   
});
city.addEventListener("change", () => {
    let p = document.getElementById("cityErrorMsg")

    if(regExpName.test(city.value)){
        p.textContent = "Ville validé"
        p.style.color ="green"
        // firstName.style.border = "1px solid #0be45b"

    } else{
        p.innerHTML ="Ville non valide"
    }   // firstName.style.border = " 1px solid #ed3832"
         
})


let regExpEmail =  new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
email.addEventListener("change",() =>{
    let p = document.getElementById("emailErrorMsg")

    if(regExpEmail.test(email.value)){
        p.textContent = "Email Valide";
        p.style.color ="green"

    } else {
        p.innerHTML = "Email non valide";
    }
    
})



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
      "Votre panier est vide! Merci choisir des produits avant de passer commande."
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
        //Tableau qui contiendra les donnée du Ls et véfication grâce à l'id
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
            // Suppression des élément du LocalStorage
            window.localStorage.clear();
        })
        .catch((error) => {
            alert(
            "Commande invalide, merci de réessayer plus tard"
            );
        });
    }
});

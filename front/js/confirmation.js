//Affichage du numero de commande en recuperant l'id dans l'url
let orderId = document.getElementById("orderId");
let urlId = new URL(window.location.href).searchParams.get("orderId");
orderId.textContent = urlId;
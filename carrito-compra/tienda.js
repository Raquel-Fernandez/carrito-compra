//Seleccionamos todos los botones de "Añadir al carrito" y los guardamos en una variable
const buttonsAddToCart = document.querySelectorAll('.addToCart');

//Seleccionamos el botón de Comprar
const shoppingButtonComprar = document.querySelector('.comprarButton');

shoppingButtonComprar.addEventListener('click', comprarButton);

// Seleccionar el div que contiene el apartado de juegos seleccionados para comprar
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

//Añadimos un event listener para cada uno de los botones para que reaccionen cuando el usuario clique en alguno de ellos
buttonsAddToCart.forEach((buttonAddToCart) => {
  buttonAddToCart.addEventListener("click", addToCartClicked);
});


//Siempre que se añade un evento, la función callback recibe como parámetro event
function addToCartClicked(event) {
  //Seleccionamos el botón que clickamos y lo guardamos en una variable
  const button = event.target;
  /*Como queremos recoger todo lo que contiene el juego que elegimos con el botón, hay que seleccionar el div que contiene todo. 
    Se puede hacer con el método closest. Seleccionamos el evento más cercano de la clase item*/
  const item = button.closest(".item");

  //Seleccionamos los elementos que queremos del juego para mostrarlos luego en el apartado de compra
  const itemTitle = item.querySelector(".item-title").textContent;
  const itemPrice = item.querySelector(".item-price").textContent;
  const itemImg = item.querySelector(".item-image").src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImg);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImg) {

  //Elegimos los títulos de los elementos seleccionados
  const elementsTitle = shoppingCartItemsContainer.querySelectorAll('.shoppingCartItemTitle');

  /*Creamos un for para que, por cada titulo seleccionado, si es igual a otro seleccionado, 
  aumentamos el input de la cantidad seleccionada*/
  for (let i = 0; i < elementsTitle.length; i++) {
    if(elementsTitle[i].innerText === itemTitle){
      let elementQuantity = elementsTitle[i].closest('.shoppingCartItem').querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      /*Para hacer que aparezca un toast con bootstrap cada vez que añades un elemento repetido*/
      $('.toast').toast('show');
      updateShoppingCartTotal();
      //Hacemos un return para que se finalice el for y no añada otra columna con el elemento repetido
      return;
      }
  }
  //Creamos un div para el apartado de productos seleccionados
  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
      <div class="col-6">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <img src='${itemImg}' class="shopping-cart-image">
              <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}
              </h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
          </div>
      </div>
      <div class="col-4">
          <div
              class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
              <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                  value="1">
              <button class="btn btn-danger buttonDelete" type="button">X</button>
          </div>
      </div>
    </div>`;
    //Añadimos el HTMl al div que creamos con innerHTML
    shoppingCartRow.innerHTML = shoppingCartContent;
    //Añadimos el div en la lista de la compra en nuestor HTML
    shoppingCartItemsContainer.append(shoppingCartRow);

    //Seleccionamos los botones de eliminar que creamos en el div y les añadimos addEventListener
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
    //createButtonDelete(shoppingCartItemContainer);

    //Seleccionamos el input de la cantidad de elementos seleccionada y le añadamos addEventListener
    //el addEventListener es del tipo change para que se ejecute cada vez que cambia la cantidad
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);
    
    updateShoppingCartTotal();
}

//Creamos la función que actualizará el precio del carrito
function updateShoppingCartTotal(){
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  //Seleccionamos los elementos del DOM que contienen el precio
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
  shoppingCartItems.forEach(shoppingCartItem => {
    const shoppingCartPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    /*Seleccionamos el contenido del elemento que contiene el precio
    y lo convertimos en un string (19.99€ -> 19.99) con replace
    Utilizamos number para convertir el String en un número y poder operar con él*/
    const shoppingCartPrice = Number(shoppingCartPriceElement.textContent.replace('€', ''));
    
    //Seleccionamos el valor de la cantidad de elementos que hemos seleccionado
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity'); 
    
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);

    //El total es igual al precio acumulado de los elementos seleccionados por la cantidad de elementos
    total += shoppingCartPrice * shoppingCartItemQuantity;
  })
  //Introducimos el precio redondeando a 2 decimales
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

//Función botón eliminar
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  //Ejecutamos la función de actualizar el carrito para que se actualice el precio
  updateShoppingCartTotal();    
}

//Función cambiar cantidad
function quantityChanged(event){
  const input = event.target;
  /*Ejemplo de operador condicional ternario, equivale a un if en el que si el valor del input es = o < a 0 
  el valor del input=1 y en caso contrario no hace nada. Es lo mismo que:
  if(input.value <= 0){
    input.value = 1;  
  }*/
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

//Función comprar botón y desaparezca el div del contenido del carrito
function comprarButton(){
  shoppingCartItemsContainer.remove();
  updateShoppingCartTotal();
}
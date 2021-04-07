//Url del servidor
const serverUrl = 'http://127.0.0.1:5500/';
//Ruta del archivo local que contiene el mockup
const itemsPath = 'mock/items.json';
//Ruta del archivo local que contiene las imágenes
const imagesPath = 'img/';

const items = document.querySelector('.items');

//Cuando cargue el archivo que ejecute una función
window.onload = getData();

//Función que realiza fetch al servidor y devuelve el mockup items.json
function getData() {
    fetch(`${serverUrl}${itemsPath}`)
    .then((res) => res.json())
    //.then((data) => console.log(data));

    .then((data) => printData(data));
}

//Función para crear el html a partir del mockup .json
function printData(data){
    const itemContainer = document.createElement('div');
    //Llamar a la clase 'row' de bootstrap
    itemContainer.className = 'row';

    data.forEach(item => {
        itemContainer.innerHTML += createDocElement(item);
        items.append(itemContainer);
    })
}

function createDocElement(item){
    const itemHtml = `
    <div class="col-12 col-md-6">
        <div class="item shadow mb-4">
            <h3 class="item-title">${item.title}</h3>
            <img class="item-image" src=${serverUrl}${imagesPath}${item.image}>
            <div class="item-details">
                <h4 class="item-price">${item.price}</h4>
                <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>
    `
    return itemHtml;
}
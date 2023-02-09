






// Add to cart
// Functions

 var loadCart = function(){
  // Retrieve cart from local storage
  var cart = JSON.parse(localStorage.getItem('cart'));

  if(cart == null){
    cart = {};
  }

  if(!(username in cart)){
    cart[username] = [];
    // Store cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.getElementById('cart-button').getElementsByTagName('span')[0].innerText = cart[username].length;


  for (var i = 0; i < cart[username].length; i++){

    element = document.getElementById(cart[username][i]);
    $( "#cart-list" ).append( '<li class="cart-element list-group-item justify-content-between align-items-center" id="cart-' + element.id + '">' + element.getElementsByTagName('h1')[0].innerText + '<button class="btn"><i class="text-primary fa-regular fa-trash-can"></i></button></li>' );
    document.getElementById('cart-'+element.id).getElementsByTagName('button')[0].addEventListener('click', removeFromCart, false);
  }

  return cart
}


var addToCart = function() {
  
  element = this.parentElement.parentElement;
  
  if(cart[username].includes(element.id)){return}

  cart[username].push(element.id);
  
  // Store cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart number
  document.getElementById('cart-button').getElementsByTagName('span')[0].innerText = cart[username].length;
  
  $( "#cart-list" ).append( '<li class="cart-element list-group-item justify-content-between align-items-center" id="cart-' + element.id + '">' + element.getElementsByTagName('h1')[0].innerText + '<button class="btn"><i class="text-primary fa-regular fa-trash-can"></i></button></li>' );
  document.getElementById('cart-'+element.id).getElementsByTagName('button')[0].addEventListener('click', removeFromCart, false);
};



var removeFromCart = function() {
  
  element = this.parentElement;

  // Only continue if exist
  if(!(cart[username].includes(element.id.substring(5)))){return}

  const index =  cart[username].indexOf(element.id.substring(5));
  if (index > -1) { // only splice array when item is found
    cart[username].splice(index, 1); // 2nd parameter means remove one item only
  }

  element.remove();

  // Store cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart number
  document.getElementById('cart-button').getElementsByTagName('span')[0].innerText = cart[username].length;

};



var emptyCart = function() {
  
  element = document.getElementById("cart-list");

  cart[username] = [];

  // Store cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  element.innerHTML = "";
  
  // Update cart number
  document.getElementById('cart-button').getElementsByTagName('span')[0].innerText = cart[username].length;

};


function loadData(username) {
  
  $.getJSON(`catalog.json?user=${username}`, function(data) {
    // JSON result in `data` variable
    console.log(data);
    console.log(data["catalog"]);
    console.log(data["catalog"][0].name);

    for (var i = 0; i < data["catalog"].length; i++){
      
      $( "#inventory-list" ).prepend(`<a class="inventory-element list-group-item justify-content-between align-items-center" data-bs-toggle="list" href="#product-${data["catalog"][i].productid}">${data["catalog"][i].name}<span class="badge bg-primary rounded-pill">14</span></a>`);
      
      $( "#products" ).append(`<div class="product tab-pane" id="product-${data["catalog"][i].productid}">
        <div class="small mb-1">BIN: #${data["catalog"][i].bin}</div>
        <h1 class="display-5 fw-bolder">${data["catalog"][i].name}</h1>
        <p class="fs-5 mb-2">${data["catalog"][i].category}</p>
        <p class="lead">${data["catalog"][i].description}</p>
        <div class="d-flex" data-productid="${data["catalog"][i].productid}">
            <button class="fav-product btn btn-dark" type="button"><i class="fa-solid fa-star"></i></button>
            &nbsp;
            <button class="add-product btn btn-outline-dark" type="button"><i class="fa-solid fa-cart-shopping"></i> Legg til</button>
        </div>
      </div>`);

    }

    var products = document.getElementsByClassName('product');

    for (var i = 0; i < products.length; i++) {
      products[i].getElementsByClassName('add-product')[0].addEventListener('click', addToCart, false);
    }

  });

};



/*
<li class="cart-element list-group-item justify-content-between align-items-center" id="cart-product-2">20 ohm motstand<button class="btn"><i class="text-primary fa-regular fa-trash-can"></i></button></li>
*/



// Script

var username;
var cart;




document.getElementById('remove-cart').addEventListener('click', () => {
  emptyCart();
  document.getElementById('offcanvasRight').classList.remove('show');
});


document.getElementById('order-cart').addEventListener('click', () => { 
  document.getElementById('offcanvasRight').classList.remove('show');

  $( "#checkout-number" ).text(cart[username].length);
  
  $('#orderModal').modal('show');
});
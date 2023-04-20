// JavaScript

// ### Functions ###

// Cookies
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function setCookie(name, value, seconds) {
  var date = new Date();
  date.setTime(date.getTime()+(seconds));
  document.cookie = name+"="+value+"; expires="+date.toGMTString();
}




function addToCart() {
  console.log("added");
}

function removeFromCart(id) {
  
  console.log( id );
}

function loadData(username) {
  
  $.getJSON(`catalog.json?user=${username}`, function(data) {
    // JSON result in `data` variable
    console.log(data);
    console.log(data["catalog"]);
    console.log(data["catalog"][0].name);

    // Display products from returned JSON 
    data["catalog"].forEach(product => {

      if(product.availability){
        var availability = `<span class="badge bg-success rounded-pill">Tilgjengelig</span>`;
      } else {
        var availability = `<span class="badge bg-danger rounded-pill">Ikke på lager</span>`;
      }

      $( "#inventory-list" ).prepend(`<a class="inventory-element list-group-item justify-content-between align-items-center" data-bs-toggle="list" href="#product-${product.productid}">${product.name}${availability}</a>`);
      
      $( "#products" ).append(`<div class="product tab-pane" id="product-${product.productid}">
        <div class="small mb-1">BIN: #${product.bin}</div>
        <h1 class="display-5 fw-bolder">${product.name}</h1>
        <p class="fs-5 mb-2">${product.category}</p>
        <p class="lead">${product.description}</p>
        <div class="d-flex" data-productid="${product.productid}">
            <button class="fav-product btn btn-dark" type="button"><i class="fa-solid fa-star"></i></button>
            &nbsp;
            <button class="add-product btn btn-outline-dark" type="button"><i class="fa-solid fa-cart-shopping"></i> Legg til</button>
        </div>
      </div>`);
    });

    var products = document.getElementsByClassName('product');

    for (var i = 0; i < products.length; i++) {
      products[i].getElementsByClassName('add-product')[0].addEventListener('click', addToCart, false);
    }


    
    cart = data["cart"];
    
    $( "#cart-button span" ).text(cart.length);


    for (var i = 0; i < cart.length; i++){

      for(var j = 0; j < data["catalog"].length; j++){
        if(data["catalog"][j].productid == cart[i]){
          
          $( "#cart-list" ).append( `<li class="cart-element list-group-item justify-content-between align-items-center" id="cart-${data["catalog"][j].productid}">${data["catalog"][j].name}<button class="btn"><i class="text-primary fa-regular fa-trash-can"></i></button></li>` );
          
          $( ".cart-element button" ).click(function(){
            console.log(this.parentElement.id);
          });


          /*
          
          $( `#cart-${data["catalog"][j].productid} button` ).click(function(){
            removeFromCart( data["catalog"][j].productid )
          });
          
          */

          break;
          
        }
      }


    }





  });

};











// ### Main script ###

// Inventory search
const searchInput = document.getElementById('productsearch');
const listElements = document.querySelectorAll('.inventory-element');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  showSidenavOptions();
  const valueExist = !!filter.length;

  if (valueExist) {
    listElements.forEach((el) => {
      const elText = el.textContent.trim().toLowerCase();
      const isIncluded = elText.includes(filter);
      if (!isIncluded) {
        el.classList.add("d-none");
      }
    });
  }
});

const showSidenavOptions = () => {
  listElements.forEach((el) => {
    el.classList.remove("d-none");
  });
};





var username;

$( "#logInButton" ).click(function() {
  setCookie("username", $( "#logInName" ).value, 3000000) // Fjern en 0
  username = readCookie("username");

  loadData(username);
});


$( document ).ready(function() {
  if(readCookie("username") == null){
    $('#logInModal').modal('show');
  } else {
    username = readCookie("username");
    
    loadData(username);
  }
});
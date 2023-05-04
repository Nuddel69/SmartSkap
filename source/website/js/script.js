// JavaScript

// Basic functions
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

function setCookie(name, value) {
  var date = new Date();
  date.setTime(date.getTime()+(300000));
  document.cookie = name+"="+value+"; expires="+date.toGMTString();
}


// Design logic

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


// Catalog and cart logic

var catalog;


function removeFromCart(id){
  // Remove from cart
  const index = cart.indexOf(id);
  if(index > -1){
    cart.splice(index, 1);
  }
  // Remove from list
  $( `li[data-productid="${id}"]` ).remove();
  // Update number
  $( ".cart-nr" ).text(cart.length);
}


function addToCart(id){
  if(cart.includes(id)){
    return;
  }

  cart.push(id);
  product = catalog.find(x => x.id == id);
  $( ".cart-list" ).append( `<li class="cart-element list-group-item justify-content-between align-items-center" data-productid="${product.id}">${product.name}<button class="btn" onClick="removeFromCart(${product.id})"><i class="text-primary fa-regular fa-trash-can"></i></button></li>` );

  $( ".cart-nr" ).text(cart.length);
}



$(window).on('load', function() {
  if(!readCookie("username")){
    $('#logInModal').modal('show');
    return;
  }

  // User is logged in
  username = readCookie("username");
  
  // Call API to get catalog
  $.getJSON("./catalog.json", function(result){

    catalog = result;
    // Display products from returned JSON 

    catalog.forEach(product => {

      if(product.availability){
        var availability = `<span class="badge bg-success rounded-pill">Tilgjengelig</span>`;
      } else {
        var availability = `<span class="badge bg-danger rounded-pill">Ikke på lager</span>`;
      }

      $( "#inventory-list" ).prepend(`<a class="inventory-element list-group-item justify-content-between align-items-center" data-bs-toggle="list" href="#pane-${product.id}">${product.name}${availability}</a>`);
      $( "#products" ).prepend(`<div class="product tab-pane" id="pane-${product.id}">
        <div class="small mb-1">BIN: #${product.bin}</div>
        <h1 class="display-5 fw-bolder">${product.name}</h1>
        <p class="fs-5 mb-2">${product.category}</p>
        <p class="lead">${product.description}</p>
        <div class="d-flex" data-productid="${product.productid}">
            <button class="fav-product btn btn-dark" type="button"><i class="fa-solid fa-star"></i></button>
            &nbsp;
            <button class="add-product btn btn-outline-dark" type="button" onClick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Legg til</button>
        </div>
      </div>`);
    });



    cart = [1, 2];

    // Load Cart
    $(".cart-nr").text = cart.length;
    cart.forEach(i => {
      product = catalog.find(x => x.id == i);
      console.log

      $( ".cart-list" ).append( `<li class="cart-element list-group-item justify-content-between align-items-center" data-productid="${product.id}">${product.name}<button class="btn" onClick="removeFromCart(${product.id})"><i class="text-primary fa-regular fa-trash-can"></i></button></li>` );
    });

    $( ".cart-nr" ).text(cart.length);

  });

});


// Login
document.getElementById('logInButton').addEventListener('click', () => {
  setCookie("username", document.getElementById('logInName').value)
  location.reload();
});


// Save cart
document.getElementById('save-cart').addEventListener('click', () => {
  fetch('https://reqbin.com/echo/post/json', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": 78912 })
  })
  
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response)))
});


document.getElementById('order-cart').addEventListener('click', () => { 
  document.getElementById('offcanvasRight').classList.remove('show');

  // Send results


  cart.forEach(id => {
    console.log(cart);
    removeFromCart(id);
  });

  $('#orderModal').modal('show');
});
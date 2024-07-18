
//Sidebar Events
let sideBar = document.getElementById("side-container");
let overlay = document.getElementById("overlay");

function showSidebar() {
  sideBar.classList.add("toggle");
  overlay.classList.add("toggle");
}
function hideSidebar() {
  sideBar.classList.remove("toggle");
  overlay.classList.remove("toggle");
}



//Setting Error
// function setError(id, error) {
//   element = document.getElementById(id);
//   element.getElementsByClassName("error")[0].innerHTML = error;
// }



//Invoice view
let invoiceView = document.getElementById("invoice-view");
function openInvoice() {
  invoiceView.classList.add('toggle');
  overlay.classList.add('toggle')

}
function closeInvoice() {
  invoiceView.classList.remove('toggle');
  overlay.classList.remove('toggle')
  document.myForm.reset();
}






//Remaining weigtht 
let cuttWeight = document.myForm.cutting;
let remainingWeight = document.myForm.remaining;
let itemWeight = document.myForm.weight;

let totalWeight = () => {
  remainingWeight.value = itemWeight.value - cuttWeight.value;
  console.log(remainingWeight.value)
  let totalCheckout = parseFloat(itemWeight.value) * parseFloat(totalPrice.value)
  console.log(totalCheckout);
  totalPrice.value = totalCheckout;
};

//Total price 
// let extraPrice = document.myForm.extra;
// let discount = document.myForm.discount;
// let totalPrice = document.myForm.total;

// function extraCharge() {
//   console.log(extraPrice.value)
//   let total = (totalPrice.value / 100) * extraPrice.value;
//   let newPrice = parseFloat(totalPrice.value) + parseFloat(total);
//   totalPrice.value = newPrice;
// };

// function discountCharge() {
//   console.log(discount.value)
//   let total = (totalPrice.value / 100) * discount.value;
//   let newPrice = parseFloat(totalPrice.value) - parseFloat(total);
//   totalPrice.value = newPrice;
// }

function totalCheckout() {
  totalPrice.value * itemWeight.value
}

//Auto update cleaning and granding price
document.addEventListener('DOMContentLoaded', () => {
  let cleaningPriceInput = document.getElementById('cleaning-price')
  let grandingPriceInput = document.getElementById('granding-price')

  productMenu.addEventListener('change', () => {
    document.getElementById('select-item').setAttribute('disabled', true);
    const selectedProduct = productItems.find(product => product.product_name === productMenu.value)
    if (selectedProduct) {
      cleaningPriceInput.value = selectedProduct.cleaning_price;
      grandingPriceInput.value = selectedProduct.granding_price;

      totalPrice.value = selectedProduct.cleaning_price + selectedProduct.granding_price;
    }
  })
})


//Menu Options Generator
document.addEventListener('DOMContentLoaded', async () => {
  try {
    response = await fetch('/api')
    const products = await response.json()

    products.forEach(product => {


      let productMenu = document.getElementById('productMenu');
      return productMenu.innerHTML += `<option value="${product.product_name}">${product.product_name}</option>`

    }

    );
  } catch (error) {
    console.error('Error fetching products', error);
  }
})
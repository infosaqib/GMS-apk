//Form Validation
function formValidate() {
  // Name Validation
  let name = document.myForm.name.value;
  if (name.length < 5) {
    setError("name", "Name is too short");

    return false;
  }

//   Item selection validation
  let item = document.myForm.items.value;
  if (item == 0) {
    setError("items", "select an item here");
    return false;
  }
}

let listCounter = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);

//Prevent form to reload the window on submission
document.myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//Total price 
let extraPrice = document.myForm.extra;
let discount = document.myForm.discount;
let totalPrice = document.myForm.total;

function extraCharge() {
  console.log(extraPrice.value)
  let total = (totalPrice.value / 100) * extraPrice.value;
  let newPrice = parseFloat(totalPrice.value) + parseFloat(total);
  totalPrice.value = newPrice;
};

function discountCharge() {
  console.log(discount.value)
  let total = (totalPrice.value / 100) * discount.value;
  let newPrice = parseFloat(totalPrice.value) - parseFloat(total);
  totalPrice.value = newPrice;
}


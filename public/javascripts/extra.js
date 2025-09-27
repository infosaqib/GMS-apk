//Form Validation
function formValidate() {
  // Name Validation
  let name = document.myForm.name.value;
  if (name.length == null || "") {
    setError("name", "Enter Your name");

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



//Total weigtht
// let totalWeight = () => {
//   remainingWeight.value = itemWeight.value - cuttWeight.value;
//   console.log(remainingWeight.value);
//   totalGrandingPrice();
//   totalCleaningGrandingPrice();
//   totalCleaningGrandingChraiPrice();
//   totalPinjaiPrice();
//   totalFillingPinjaiPrice()
//   totalStichingPinjaiPrice()
// };

// itemWeight.addEventListener('input', totalWeight)
// cuttWeight.addEventListener('input', totalWeight)

//Total Checkout
// function totalGrandingPrice() {
//   totalPrice.value = parseFloat(grandingPriceInput.value) * parseFloat(remainingWeight.value)
// }
// function totalCleaningGrandingPrice() {
//   totalPrice.value = (parseFloat(cleaningPriceInput.value) + parseFloat(grandingPriceInput.value)) * parseFloat(remainingWeight.value)
//   console.log(totalPrice.value);

// }
// function totalCleaningGrandingChraiPrice() {
//   totalPrice.value = (parseFloat(cleaningPriceInput.value) + parseFloat(grandingPriceInput.value) + parseFloat(chraiPriceInput.value)) * parseFloat(remainingWeight.value)
// }
// function totalPinjaiPrice() {
//   totalPrice.value = parseFloat(pinjaiPriceInput.value) * parseFloat(remainingWeight.value)
// }

// function totalStichingPrice() {
//   totalPrice.value = parseFloat(totalPrice.value) + (parseFloat(stichingQuantityInput.value) * parseFloat(stichingPriceInput.value))
// }
// function totalFillingPrice() {
//   totalPrice.value = parseFloat(totalPrice.value) + (parseFloat(fillingQuantityInput.value) * parseFloat(fillingPriceInput.value))
// }

// stichingQuantityInput.addEventListener('input', totalStichingPrice)
// fillingQuantityInput.addEventListener('input', totalFillingPrice)




// let extraPrice = document.clientForm.extra;
// let discount = document.clientForm.discount;
// let totalPrice = document.clientForm.total;

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






// document.addEventListener("DOMContentLoaded", async () => {
//   const cleaningPriceInput = document.getElementById("cleaning-price");
//   const grandingPriceInput = document.getElementById("granding-price");
//   const form = document.getElementById('clientForm'); // Replace with your actual form ID


//   try {
//     const response = await fetch("/api/products");

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const products = await response.json();

//     productMenu.addEventListener("change", () => {
//       handleProductSelections(products);
//     });

//     // Form submission handler
//     form.addEventListener('submit', async (event) => {
//       event.preventDefault(); // Prevent traditional form submission

//       const formData = new FormData(form);
//       try {
//         const response = await fetch('/api/client-invoices', {
//           method: 'POST',
//           body: formData
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('invoice created:', result);

//         // Clear form and show success message
//         form.reset();
//         alert('invoice created successfully!');

//         // Reset the product selection
//         productMenu.removeAttribute("disabled");
//         resetPriceInputs();
//       } catch (error) {
//         console.error('Error creating invoice:', error);
//         alert('Error creating invoice. Please try again.');
//       }
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }

//   function handleProductSelections(products) {
//     const selectedProduct = products.find(
//       (product) => product.product_name === productMenu.value
//     );

//     if (selectedProduct) {
//       updatePriceInputs(selectedProduct);
//     } else {
//       resetPriceInputs();
//     }
//   }

//   function updatePriceInputs(product) {
//     cleaningPriceInput.value = product.cleaning_price;
//     grandingPriceInput.value = product.granding_price;
//     totalPrice.value = product.cleaning_price + product.granding_price;
//     productMenu.setAttribute("disabled", true);
//   }

//   function resetPriceInputs() {
//     cleaningPriceInput.value = "";
//     grandingPriceInput.value = "";
//     totalPrice.value = "";
//     productMenu.removeAttribute("disabled");
//   }
// });



//! Invoice Card Generator
// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     response = await fetch("/api/client-invoices");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const invoices = await response.json();

//     invoices.forEach((invoice) => {
//       let { _id, id, name, item_name, item_weight, total_price, updatedAt } =
//         invoice;

//       // Convert updatedAt to a readable date format DD-MM-YYYY
// const date = new Date(updatedAt);
// const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
//   date.getMonth() + 1
// )
//   .toString()
//   .padStart(2, "0")}-${date.getFullYear()}`;

//       const invoiceCardTemplate = `
//          <div onclick="openInvoice(event)" data-id="${_id}" class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4 bg-white gap-7">
//           <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
//             <p class="text-black text-sm lg:text-base mb-2"><b class="text-blue-300">#</b>${id}</p>
//             <p class="text-gray-400 text-sm lg:text-sm">${formattedDate}</p>
//             <p class="text-gray-400 text-sm lg:text-sm capitalize">${name}</p>
//           </div>
//           <div>
//          <p class="text-green-400 text-lg lg:text-sm"></p>
//           </div>
//           <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
//             <p class="text-gray-400 text-sm lg:text-sm capitalize">${item_name}</p>
//             <p class="text-gray-400 text-sm lg:text-sm"><b>Rs.${total_price}</b></p>
//             <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
//               <path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/>
//             </svg>
//           </div>
//         </div>
//         `;

//       let invoiceGrid = document.getElementById("invoice-coll");
//       invoiceGrid.innerHTML += invoiceCardTemplate;
//     });
//   } catch (error) {
//     console.error("Error fetching invoices", error);
//   }
// });

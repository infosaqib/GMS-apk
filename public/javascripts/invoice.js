
//Global variables
let productMenu = document.getElementById("productMenu"),
  cuttWeight = document.myForm.cutting,
  remainingWeight = document.myForm.remaining,
  itemWeight = document.myForm.weight,
  //Inputs
  cleaningPriceInput = document.getElementById("cleaning-price"),
  grandingPriceInput = document.getElementById("granding-price"),
  stichingPriceInput = document.getElementById("stiching-price"),
  stichingQuantityInput = document.getElementById("stiching-quantity"),
  fillingPriceInput = document.getElementById("filling-price"),
  fillingQuantityInput = document.getElementById("filling-quantity"),
  chraiPriceInput = document.getElementById("chrai-price"),
  pinjaiPriceInput = document.getElementById("pinjai-price"),
  productPriceInput = document.getElementById("product-price"),
  totalPrice = document.myForm.total,
  cleaningCheckbox = document.getElementById('remember'),
  //Grids' input
  pinjaiGrid = document.getElementById('pinjaiGrid'),
  fillingGrid = document.getElementById('fillingGrid'),
  stichingGrid = document.getElementById('stichingGrid'),
  cleaningGrid = document.querySelectorAll('.cleaningGrid'),
  grandingGrid = document.getElementById('grandingGrid'),
  chraiGrid = document.getElementById('chraiGrid'),
  productPriceGrid = document.getElementById('productPriceGrid');


//Default scripting
cleaningGrid.forEach(element => {
  element.style.display = 'none'
});


//Auto update prices
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    productMenu.addEventListener("change", () => {
      document.getElementById("select-item").setAttribute("disabled", true);
      const selectedProduct = products.find(
        (product) => product.product_name === productMenu.value
      );

      // When a product is selected and checkbox is checked, set the cleaning price
      cleaningCheckbox.addEventListener('change', function () {
        if (this.checked && selectedProduct) {
          cleaningPriceInput.value = selectedProduct.cleaning_price;
        } else {
          cleaningPriceInput.value = '';
        }
        calculateTotalPrice();
      });


      if (selectedProduct) {
        grandingPriceInput.value = selectedProduct.granding_price;
        fillingPriceInput.value = selectedProduct.filling_price;
        stichingPriceInput.value = selectedProduct.stiching_price;
        chraiPriceInput.value = selectedProduct.chrai_price;
        pinjaiPriceInput.value = selectedProduct.pinjai_price;
        productPriceInput.value = selectedProduct.product_price;

        // Show or hide grids based on price values
        pinjaiGrid.style.display = selectedProduct.pinjai_price > 0 ? 'grid' : 'none';
        fillingGrid.style.display = selectedProduct.filling_price > 0 ? 'grid' : 'none';
        stichingGrid.style.display = selectedProduct.stiching_price > 0 ? 'grid' : 'none';
        grandingGrid.style.display = selectedProduct.granding_price > 0 ? 'grid' : 'none';
        chraiGrid.style.display = selectedProduct.chrai_price > 0 ? 'flex' : 'none';
        productPriceGrid.style.display = selectedProduct.product_price > 0 ? 'flex' : 'none';

        // Apply forEach to cleaningGrid (assuming it's a NodeList or HTMLCollection)
        cleaningGrid.forEach(grid => {
          grid.style.display = selectedProduct.cleaning_price > 0 ? 'flex' : 'none';
        });
      }
    });
  } catch (error) {
    console.log("Error fetching product: " + error);
  }
});






// Helper function to parse float and return 0 if NaN
const parseFloatSafe = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Calculate remaining weight
const calculateRemainingWeight = () => {
  const itemWeightValue = parseFloatSafe(itemWeight.value);
  const cuttWeightValue = parseFloatSafe(cuttWeight.value);
  return Math.max(itemWeightValue - cuttWeightValue, 0);
};

// Calculate total price based on selected options
const calculateTotalPrice = () => {
  const remainingWeight = calculateRemainingWeight();
  let price = 0;

  // Base price calculation
  const cleaningPrice = parseFloatSafe(cleaningPriceInput.value);
  const grandingPrice = parseFloatSafe(grandingPriceInput.value);
  const chraiPrice = parseFloatSafe(chraiPriceInput.value);
  const pinjaiPrice = parseFloatSafe(pinjaiPriceInput.value);
  const productPrice = parseFloatSafe(productPriceInput.value);

  price += (cleaningPrice + grandingPrice + chraiPrice + pinjaiPrice + productPrice) * remainingWeight;

  // Additional services
  const stichingQuantity = parseFloatSafe(stichingQuantityInput.value);
  const stichingPrice = parseFloatSafe(stichingPriceInput.value);
  price += stichingQuantity * stichingPrice;

  const fillingQuantity = parseFloatSafe(fillingQuantityInput.value);
  const fillingPrice = parseFloatSafe(fillingPriceInput.value);
  price += fillingQuantity * fillingPrice;

  return price;
};

// Update UI
const updateUI = () => {
  remainingWeight.value = calculateRemainingWeight();
  totalPrice.value = calculateTotalPrice().toFixed(2);
};

// Event listeners
const inputElements = [
  itemWeight, cuttWeight, cleaningPriceInput, grandingPriceInput,
  chraiPriceInput, pinjaiPriceInput, stichingQuantityInput,
  stichingPriceInput, fillingQuantityInput, fillingPriceInput
];

inputElements.forEach(element => {
  element.addEventListener('input', updateUI);
});

// Initial UI update
updateUI();

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


let overlay = document.getElementById("overlay");
let sideBar = document.getElementById("side-container");

function showSidebar() {
  sideBar.classList.add("toggle");
  overlay.classList.add("toggle");
}
function hideSidebar() {
  sideBar.classList.remove("toggle");
  overlay.classList.remove("toggle");
}


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




//CREATE API FUNCTION
document.myForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const invoiceData = new FormData(document.myForm);
  const newinvoice = Object.fromEntries(invoiceData.entries());

  console.log("Invoice Data being sent:", newinvoice); // Debugging Line

  try {
    const response = await fetch('/api/client-invoices/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newinvoice),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response from API:", errorData); // Debugging Line
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const newinvoiceData = await response.json();
    console.log('Invoice added successfully:', newinvoiceData);

    // Refresh the page or update the UI
    hideSidebar();
    document.myForm.reset();
    window.location.href = '/';
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
});

// document.addEventListener("DOMContentLoaded", async () => {
//   const cleaningPriceInput = document.getElementById("cleaning-price");
//   const grandingPriceInput = document.getElementById("granding-price");
//   const form = document.getElementById('myForm'); // Replace with your actual form ID


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

//Menu Options Generator
document.addEventListener("DOMContentLoaded", async () => {
  //!Invoice Open View


  //!Options generator
  try {
    response = await fetch("/api/products");
    const products = await response.json();

    products.forEach((product) => {
      let { product_name } = product;
      productMenu.innerHTML += `<option value="${product_name}">${product_name}</option>`;
    });
  } catch (error) {
    console.error("Error fetching products", error);
  }
});

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



//AUTO-FILL JS FUNCTIONALITY
function debounce(func, wait) {

  let timeout;
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  let clients = [];

  fetch('/api/clients')
    .then(response => response.json())
    .then(data => clients = data)
    .catch(error => console.log('Error fetching client data:', error))

  const nameInput = document.myForm.name
  const fatherNameInput = document.myForm.father_name
  const contactInput = document.myForm.contact
  const cnicInput = document.myForm.cnic

  const handleInput = () => {

    const inputValue = contactInput.value.trim();

    // Ensure at least 3 chracters are entered
    if (inputValue.length < 10) {
      fatherNameInput.value = '';
      nameInput.value = '';
      cnicInput.value = '';
      return;
    }

    // Create a regex to match the input value (case insensitive)
    const regex = new RegExp(`^${inputValue}`, 'i');

    // Find the invoice that matches the input name using regex
    const client = clients.find(client => regex.test(client.contact));

    if (client) {
      // Auto-fill the Father's Name and Email fields
      nameInput.value = client.name;
      fatherNameInput.value = client.fatherName;
      cnicInput.value = client.cnic;
    } else {
      // Clear the fields if no match is found
      nameInput.value = '';
      fatherNameInput.value = '';
      cnicInput.value = '';
    }
  }

  // Add event listener to the Name input field with debounce
  contactInput.addEventListener('input', debounce(handleInput, 300));
})


//Tab Content effect
document.addEventListener('DOMContentLoaded', function () {
  let tabs = document.querySelectorAll('.tab');
  let contents = document.querySelectorAll('.tab-content');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      let targetId = tab.id.replace('Tab', 'Content');

      // Hide all content divs
      contents.forEach(function (content) {
        content.classList.add('hidden');
      });

      // Remove active class from all tabs
      tabs.forEach(function (tab) {
        tab.classList.remove('bg-white', 'text-blue-500');
      });

      // Show the target content
      document.getElementById(targetId).classList.remove('hidden');

      // Add active class to the clicked tab
      tab.classList.add('bg-white', 'text-blue-500');
    });
  });
});
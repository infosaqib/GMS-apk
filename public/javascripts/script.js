
//Global variables
let productMenu = document.getElementById("productMenu");
let totalPrice = document.myForm.total;

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


//Invoice view
let invoiceView = document.getElementById("invoice-view");

async function openInvoice(event) {
  // event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  invoiceView.classList.add("toggle");
  overlay.classList.add("toggle");
  document.body.style.overflowY = 'hidden'
  const userId = event.target.dataset.id;

  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const user = await response.json();

    let { _id, id, name, item_name, item_weight, total_price, updatedAt } = user;

    // Convert updatedAt to a readable date format DD-MM-YYYY
    const date = new Date(updatedAt);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

    const invoiceTemplate = ` <header
             class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center bg-white py-3 md:py-6 px-4 my-3 rounded-lg">
             <button onclick="closeInvoice()"
                 class=" text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
                 <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                     <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none"
                         fill-rule="evenodd" />
                 </svg> Go back</button>
             <div class="flex flex-row gap-4"> <button onclick="return printInvoice() "
                     class=" text-white text-sm md:text-lg px-3 md:px-4  py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
                 <button
                     class="border border-purple-700 rounded-lg px-3 md:px-4  py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50" data-id = "${_id}"
                     onclick="deleteInvoice(event)">Delete</button>
             </div>
         </header>
         <main id="invoice-img " class="bg-white p-2 md:p-4 rounded-lg">
             <div class="flex flex-col  justify-between">
                 <div class="flex flex-col gap-4 md:block">
                     <div class="flex flex-col">
                         <p class="text-black text-xs md:text-lg"><b class="text-blue-300">#</b>${id}</p>
                         <p class="text-gray-400 text-xs md:text-base">Mr. ${name}</p>
                     </div>
                     <div class="flex flex-col py-3">
                         <p class="text-gray-400 text-xs md:text-lg  font-thin">Invoice Date</p>
                         <p class="text-black font-bold text-xs md:text-base">${formattedDate}</p>
                     </div>
                     <!-- <div class="flex flex-col py-3">
                     <p class="text-gray-400 text-xs md:text-lg font-thin">Payment method</p>
                     <p class="text-black font-bold text-xs md:text-base">Cash on dilivery</p>
                 </div>
                 <div class="flex flex-col py-3">
                     <p class="text-gray-400 text-xs md:text-lg font-thin">Payment action</p>
                     <p class="text-black font-bold text-xs md:text-base">pending</p>
                 </div> -->
                 </div>
                 <div
                     class="flex flex-row   items-start   justify-evenly bg-gray-100 rounded-lg md:rounded-t-xl md:mx-8 mt-0 md:mt-6 p-2">
                     <div class="flex flex-col p-2">
                         <p class="text-gray-400 text-xs md:text-base">Item name</p>
                         <p class="text-black font-bold text-xs md:text-base">${item_name}</p>
                     </div>
                     <div class="flex flex-col p-2">
                         <p class="text-gray-400 text-xs md:text-base">Qty.</p>
                         <p class="text-black font-bold text-xs md:text-base">${item_weight} kg</p>
                     </div>
                     <div class="flex flex-col p-2">
                         <p class="text-gray-400 text-xs md:text-base">Total</p>
                         <p class="text-black font-bold text-xs md:text-base">Rs.${total_price}</p>
                     </div>
                 </div>
       
             </div>
             <div class="flex flex-row items-center justify-between bg-gray-700 p-3 md:p-6 rounded-lg">
                 <h1 class="text-white text-sm md:text-lg font-bold">Amount Due</h1>
                 <p class="text-white text-sm md:text-lg font-bold">Rs.${total_price}</p>
             </div>
         </main> `;

    invoiceView.innerHTML = invoiceTemplate;
  } catch (error) {
    console.error("Error fetching invoice:", error);
  }
}

function closeInvoice() {
  invoiceView.classList.remove("toggle");
  overlay.classList.remove("toggle");
  document.body.style.overflowY = 'scroll'
}

async function deleteInvoice(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  const userId = event.currentTarget.dataset.id;
  console.log(userId);

  const userAction = confirm('Are you sure to delete this user?')
  if (userAction) {
    try {
      const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      alert(result.message);

      closeInvoice();
      window.location.reload();



    } catch (error) {
      console.error("Error deleteing user:", error.message);
      if (error.message.includes("404")) {
        alert("User not Found")
      } else {
        console.error("Error deleteing user:" + error.message);
      }
    }
  }
  return;
}




//Remaining weigtht
let cuttWeight = document.myForm.cutting;
let remainingWeight = document.myForm.remaining;
let itemWeight = document.myForm.weight;

let totalWeight = () => {
  remainingWeight.value = itemWeight.value - cuttWeight.value;
  console.log(remainingWeight.value);
  let totalCheckout =
    parseFloat(remainingWeight.value) * parseFloat(totalPrice.value);
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

// function totalCheckout() {
//   totalPrice.value * itemWeight.value
// }

//Auto update cleaning and granding price

document.addEventListener("DOMContentLoaded", async () => {
  try {
    response = await fetch("/api/products");
    const products = await response.json();

    let cleaningPriceInput = document.getElementById("cleaning-price");
    let grandingPriceInput = document.getElementById("granding-price");

    productMenu.addEventListener("change", () => {
      document.getElementById("select-item").setAttribute("disabled", true);
      const selectedProduct = products.find(
        (product) => product.product_name === productMenu.value
      );
      if (selectedProduct) {
        cleaningPriceInput.value = selectedProduct.cleaning_price;
        grandingPriceInput.value = selectedProduct.granding_price;

        totalPrice.value =
          selectedProduct.cleaning_price + selectedProduct.granding_price;
      }
    });


  } catch (error) {
    console.log("Error fethcing product:" + error)
  }
});

//CREATE API FUNCTION
document.myForm.onsubmit = async (e) => {
  e.preventDefault();

  const userData = new FormData(document.myForm);
  const newUser = Object.fromEntries(userData.entries());

  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const newUserData = await response.json();
    console.log('user added successfully:', newUserData);

    //refresh the product list here
    hideSidebar();
    document.myForm.reset();
    window.location.reload();
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


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
//         const response = await fetch('/api/users', {
//           method: 'POST',
//           body: formData
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('User created:', result);

//         // Clear form and show success message
//         form.reset();
//         alert('User created successfully!');

//         // Reset the product selection
//         productMenu.removeAttribute("disabled");
//         resetPriceInputs();
//       } catch (error) {
//         console.error('Error creating user:', error);
//         alert('Error creating user. Please try again.');
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
document.addEventListener("DOMContentLoaded", async () => {
  try {
    response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    users.forEach((user) => {
      let { _id, id, name, item_name, item_weight, total_price, updatedAt } =
        user;

      // Convert updatedAt to a readable date format DD-MM-YYYY
      const date = new Date(updatedAt);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;

      const invoiceCardTemplate = `
         <div onclick="openInvoice(event)" data-id="${_id}" class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4 bg-white gap-7">
          <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
            <p class="text-black text-sm lg:text-base mb-2"><b class="text-blue-300">#</b>${id}</p>
            <p class="text-gray-400 text-sm lg:text-sm">${formattedDate}</p>
            <p class="text-gray-400 text-sm lg:text-sm">${name}</p>
          </div>
          <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
            <p class="text-gray-400 text-sm lg:text-sm">${item_name}</p>
            <p class="text-gray-400 text-sm lg:text-sm"><b>Rs.${total_price}</b></p>
            <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/>
            </svg>
          </div>
        </div>
        `;

      let invoiceGrid = document.getElementById("invoice-coll");
      invoiceGrid.innerHTML += invoiceCardTemplate;
    });
  } catch (error) {
    console.error("Error fetching users", error);
  }
});

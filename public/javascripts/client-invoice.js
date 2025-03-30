
//Global variables
let productMenu = document.getElementById("productMenu"),
  cuttWeight = document.clientForm.cutting,
  remainingWeight = document.clientForm.remaining,
  itemWeight = document.clientForm.weight,
  //Inputs
  contactFormat = document.getElementById("contactInput"),
  cnicFormat = document.getElementById("cnicInput"),
  cleaningPriceInput = document.getElementById("cleaning-price"),
  grandingPriceInput = document.getElementById("granding-price"),
  stichingPriceInput = document.getElementById("stiching-price"),
  stichingQuantityInput = document.getElementById("stiching-quantity"),
  fillingPriceInput = document.getElementById("filling-price"),
  fillingQuantityInput = document.getElementById("filling-quantity"),
  chraiPriceInput = document.getElementById("chrai-price"),
  pinjaiPriceInput = document.getElementById("pinjai-price"),
  productPriceInput = document.getElementById("product-price"),
  totalPrice = document.clientForm.total,
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

//? CNIC & Contact formatting
contactFormat.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let input = e.target.value.replace(/\D/g, '');
    
    // Limit to 11 digits
    input = input.slice(0, 11);
    
    // Add hyphen after 4 digits
    if (input.length > 4) {
        input = input.slice(0, 4) + '-' + input.slice(4);
    }
    
    e.target.value = input;
});

cnicFormat.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let input = e.target.value.replace(/\D/g, '');
    
    // Limit to 13 digits
    input = input.slice(0, 13);
    
    // Add hyphens at correct positions
    if (input.length > 5) {
        input = input.slice(0, 5) + '-' + input.slice(5);
    }
    if (input.length > 13) {
        input = input.slice(0, 13) + '-' + input.slice(13);
    }
    
    e.target.value = input;
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

//* Calculate total price based on selected options
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

  // Additional prices
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

//* Update Total Price based on input of each price
const inputElements = [
  itemWeight, cuttWeight, cleaningPriceInput, grandingPriceInput,
  chraiPriceInput, pinjaiPriceInput, stichingQuantityInput,
  stichingPriceInput, fillingQuantityInput, fillingPriceInput
];

inputElements.forEach(element => {
  element.addEventListener('input', updateUI);
});

// Global UI update
updateUI();


//* Overlay and Sidebar
let overlay = document.getElementById("overlay");
let clientSideBar = document.getElementById("client-side-container");

function showClientSidebar() {
  clientSideBar.classList.add("toggle");
  overlay.classList.add("toggle");
}
function hideClientSidebar() {
  clientSideBar.classList.remove("toggle");
  overlay.classList.remove("toggle");
}

//* CREATE INVOICE FUNCTION
document.clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const invoiceData = new FormData(document.clientForm);
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
      hideClientSidebar();
      document.clientForm.reset();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  });

  
//* FETCH PRODUCT PRICES
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

  //* Menu Options Generator
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


  //* AUTO-FILL CLIENT'S DETAILS
function debounce(func, wait) {

    let timeout;
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait);
    }
  }
  
  //* FETCH CLIENT'S DETAILS
  document.addEventListener('DOMContentLoaded', () => {
    let clients = [];
  
    fetch('/api/clients')
      .then(response => response.json())
      .then(data => clients = data)
      .catch(error => console.log('Error fetching client data:', error))
  
    const nameInput = document.clientForm.name
    const fatherNameInput = document.clientForm.father_name
    const contactInput = document.clientForm.contact
    const cnicInput = document.clientForm.cnic
  
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
//* Capitalize Text

export function capitalizeText(event) {
  event.preventDefault();
  let text = event.target.value;

  // Split by spaces, capitalize each word, and rejoin
  let capitalizedText = text.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  event.target.value = capitalizedText;
}


//? Contact formatting
export function contactFormat(e) {
  // Remove all non-digit characters
  let input = e.target.value.replace(/\D/g, '');

  // Limit to 11 digits
  input = input.slice(0, 11);

  // Add hyphen after 4 digits
  if (input.length > 4) {
    input = input.slice(0, 4) + '-' + input.slice(4);
  }

  e.target.value = input;
}

//? CNIC formatting 
export function cnicFormat(e) {
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
}



//* Print Invoice
function printDiv() {
  let divContents = document.getElementById("invoice-print").innerHTML;
  let printWindow = window.open('', '', 'height=500, width=500');
  printWindow.document.open();
  printWindow.document.write(`
      <html>
      <head>
          <title>Print Div Content</title>
          <style>
           main {
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  main {
    padding: 1rem 2rem;
  }
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-base {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-thin {
  font-weight: 100;
}

.font-bold {
  font-weight: 700;
}

.text-black {
  color: black;
}

.text-gray-400 {
  color: #9CA3AF;
}

.text-white {
  color: white;
}

.text-blue-300 {
  color: #93C5FD;
}

.bg-gray-100 {
  background-color: #F3F4F6;
}

.bg-gray-700 {
  background-color: #374151;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-t-xl {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-6 {
  padding: 1.5rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.mt-0 {
  margin-top: 0;
}

.mt-6 {
  margin-top: 1.5rem;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.w-96 {
  width: 24rem;
}

@media (min-width: 768px) {
  .md\:text-base {
    font-size: 1rem;
  }

  .md\:text-lg {
    font-size: 1.125rem;
  }

  .md\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .md\:py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .md\:mx-8 {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .md\:p-6 {
    padding: 1.5rem;
  }

  .md\:rounded-t-xl {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
}

          </style>
      </head>
      <body>
          <h1>Div Contents:</h1>
          ${divContents}
      </body>
      </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

let invoiceView = document.getElementById("invoice-view");
let overlay = document.getElementById("overlay");
// Create loading animation SVG
const loadingAnimation = `
<svg class="container" viewBox="0 0 40 40" height="40" width="40">
  <circle 
    class="track"
    cx="20" 
    cy="20" 
    r="17.5" 
    pathlength="100" 
    stroke-width="5px" 
    fill="none" 
  />
  <circle 
    class="car"
    cx="20" 
    cy="20" 
    r="17.5" 
    pathlength="100" 
    stroke-width="5px" 
    fill="none" 
  />
</svg>
<style>
  .container {
  background: transparent;
    --uib-size: 40px;
    --uib-color: black;
    --uib-speed: 2s;
    --uib-bg-opacity: 0;
    height: var(--uib-size);
    width: var(--uib-size);
    transform-origin: center;
    animation: rotate var(--uib-speed) linear infinite;
    will-change: transform;
    overflow: visible;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .car {
    fill: none;
    stroke: var(--uib-color);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
    will-change: stroke-dasharray, stroke-dashoffset;
    transition: stroke 0.5s ease;
  }

  .track {
    fill: none;
    stroke: var(--uib-color);
    opacity: var(--uib-bg-opacity);
    transition: stroke 0.5s ease;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 0, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 75, 150;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dashoffset: -100;
    }
  }
</style>
`;

//! -----------------------------> Client Invoices <--------------------------------- 
// Open invoice
export async function openClientInvoice(event) {
  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  invoiceView.classList.add("toggle");
  overlay.classList.add("toggle");
  document.body.style.overflowY = 'hidden'
  const invoiceId = event.target.dataset.id;


  // Clear previous content and add loading animation
  invoiceView.innerHTML = loadingAnimation;

  try {
    const response = await fetch(`/api/client-invoices/${invoiceId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const invoice = await response.json();
    let { _id, id, name, item_name, item_weight, total_price, createdAt, barcode } = invoice;

    const date = new Date(createdAt);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

    // Generate invoice template
    invoiceView.innerHTML = `
      <header class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center bg-white py-3 md:py-6 px-4 my-3 rounded-lg">
        <button id="close-client-invoice-btn" class="text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd" />
          </svg> Go back
        </button>
        <div class="flex flex-row gap-4">
          <button id="print-client-invoice-btn" class="text-white text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
          <button id="delete-client-invoice-btn" class="border border-purple-700 rounded-lg px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50" data-id="${_id}">Delete</button>
        </div>
      </header>
      <main id="invoice-print" class="bg-white px-4 py-2 md:px-8 md:py-4 rounded-lg">
        <div class="flex flex-col justify-between">
          <div class="flex flex-row justify-around">
            <div class="flex flex-col justify-center">
              <p class="text-black text-xs md:text-lg"><b class="text-blue-300">#</b>${id}</p>
              <p class="text-gray-400 text-xs md:text-base">Mr. ${name}</p>
            </div>
            <div class="flex flex-col py-3 justify-center">
              <p class="text-gray-400 text-xs md:text-lg font-thin">Invoice Date</p>
              <p class="text-black font-bold text-xs md:text-base">${formattedDate}</p>
            </div>
          </div>
          <div class="flex flex-row items-start justify-evenly bg-gray-100 rounded-lg md:rounded-t-xl md:mx-8 mt-0 md:mt-6 p-2">
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
        <div class="flex flex-col justify-center items-center my-4">
          <img src="${barcode}" class="w-96">
        </div>
      </main>`;

    // Attach event listeners AFTER rendering
    document.getElementById("close-client-invoice-btn").addEventListener("click", closeClientInvoice);
    document.getElementById("delete-client-invoice-btn").addEventListener("click", deleteClientInvoice);
    document.getElementById('print-client-invoice-btn').addEventListener('click', printDiv)

  } catch (error) {
    console.error("Error fetching invoice:", error);
    // Optional: Show an error message in the invoiceView
    invoiceView.innerHTML = `
      <div class="flex flex-col items-center justify-center p-4">
        <p class="text-red-500 text-lg">Failed to load invoice. Please try again.</p>
      </div>
    `;
  }
}
// Make it global
window.openClientInvoice = openClientInvoice;

//todo --> Close Client invoice
export function closeClientInvoice() {
  invoiceView.classList.remove("toggle");
  overlay.classList.remove("toggle");
  document.body.style.overflowY = 'scroll'
}
// Make it global
window.closeClientInvoice = closeClientInvoice;

//todo --> Delete Client invoice
async function deleteClientInvoice(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }
  const invoiceId = event.currentTarget.dataset.id;

  const invoiceAction = confirm("Are you sure to delete this invoice?");
  if (invoiceAction) {
    try {
      const response = await fetch(`/api/client-invoices/${invoiceId}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show notification instead of alert
      showNotification("Invoice Deleted", result.message, "success");

      closeClientInvoice();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      let errorMessage = error.message.includes("404") ? "Invoice not found" : error.message;

      // Show error notification
      showNotification("Deletion Failed", errorMessage, "error");
    }
  }
}


//todo -----------------------------> Vendor Invoices <--------------------------------- 


//todo --> Vendor invoice view
export async function openVendorInvoice(event) {
  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  invoiceView.classList.add("toggle");
  overlay.classList.add("toggle");
  document.body.style.overflowY = 'hidden'
  const invoiceId = event.target.dataset.id;

  // Clear previous content and add loading animation
  invoiceView.innerHTML = loadingAnimation;



  try {
    const response = await fetch(`/api/vendor-invoices/${invoiceId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const invoice = await response.json();
    let { _id, name, product, quantity, totalPrice, createdAt } = invoice;

    const date = new Date(createdAt);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

    // Generate invoice template
    invoiceView.innerHTML = `
      <header class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center bg-white py-3 md:py-6 px-4 my-3 rounded-lg">
        <button id="close-vendor-invoice-btn" class="text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd" />
          </svg> Go back
        </button>
        <div class="flex flex-row gap-4">
          <button id="print-vendor-invoice-btn" class="text-white text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
          <button id="delete-vendor-invoice-btn" class="border border-purple-700 rounded-lg px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50" data-id="${_id}">Delete</button>
        </div>
      </header>
      <main id="invoice-print" class="bg-white px-4 py-2 md:px-8 md:py-4 rounded-lg">
        <div class="flex flex-col justify-between">
          <div class="flex flex-row justify-around">
            <div class="flex flex-col justify-center">
              <p class="text-gray-400 text-xs md:text-base">Mr. ${name}</p>
            </div>
            <div class="flex flex-col py-3 justify-center">
              <p class="text-gray-400 text-xs md:text-lg font-thin">Invoice Date</p>
              <p class="text-black font-bold text-xs md:text-base">${formattedDate}</p>
            </div>
          </div>
          <div class="flex flex-row items-start justify-evenly bg-gray-100 rounded-lg md:rounded-t-xl md:mx-8 mt-0 md:mt-6 p-2">
            <div class="flex flex-col p-2">
              <p class="text-gray-400 text-xs md:text-base">Item name</p>
              <p class="text-black font-bold text-xs md:text-base">${product}</p>
            </div>
            <div class="flex flex-col p-2">
              <p class="text-gray-400 text-xs md:text-base">Qty.</p>
              <p class="text-black font-bold text-xs md:text-base">${quantity} kg</p>
            </div>
            <div class="flex flex-col p-2">
              <p class="text-gray-400 text-xs md:text-base">Total</p>
              <p class="text-black font-bold text-xs md:text-base">Rs.${totalPrice}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between bg-gray-700 p-3 md:p-6 rounded-lg">
          <h1 class="text-white text-sm md:text-lg font-bold">Amount Due</h1>
          <p class="text-white text-sm md:text-lg font-bold">Rs.${totalPrice}</p>
        </div>
      </main>`;

    // Attach event listeners AFTER rendering
    document.getElementById("close-vendor-invoice-btn").addEventListener("click", closeVendorInvoice);
    document.getElementById("delete-vendor-invoice-btn").addEventListener("click", deleteVendorInvoice);
    document.getElementById('print-vendor-invoice-btn').addEventListener('click', printDiv)

  } catch (error) {
    console.error("Error fetching invoice:", error);
    // Optional: Show an error message in the invoiceView
    invoiceView.innerHTML = `
      <div class="flex flex-col items-center justify-center p-4">
        <p class="text-red-500 text-lg">Failed to load invoice. Please try again.</p>
      </div>
    `;
  }
}
// Make it global
window.openVendorInvoice = openVendorInvoice;

//todo --> Close Vendor invoice
export function closeVendorInvoice() {
  invoiceView.classList.remove("toggle");
  overlay.classList.remove("toggle");
  document.body.style.overflowY = 'scroll'
}
// Make it global
window.closeVendorInvoice = closeVendorInvoice;


//todo --> Delete Vendor invoice
async function deleteVendorInvoice(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }
  const invoiceId = event.currentTarget.dataset.id;

  const invoiceAction = confirm("Are you sure to delete this invoice?");
  if (invoiceAction) {
    try {
      const response = await fetch(`/api/vendor-invoices/${invoiceId}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show notification instead of alert
      showNotification("Invoice Deleted", result.message, "success");

      closeVendorInvoice();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      let errorMessage = error.message.includes("404") ? "Invoice not found" : error.message;

      // Show error notification
      showNotification("Deletion Failed", errorMessage, "error");
    }
  }
}


//todo --> Show Notification using Notification API
function showNotification(title, message, type) {
  // Check if the Notification API is supported
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        // icon: type === "success" ? "/path/to/success-icon.png" : "/path/to/error-icon.png",
        icon: type === "success",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, {
            body: message,
            icon: type === "success",
          });
        }
      });
    }
  } else {
    console.error("Browser does not support notifications.");
  }
}



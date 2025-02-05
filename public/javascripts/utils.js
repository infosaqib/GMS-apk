//? Capitalize Text
export function capitalizeText(event) {
    let text = event.target.value;
    
    // Split by spaces, capitalize each word, and rejoin
    let capitalizedText = text.split(' ').map(word => {
        if (word.length === 0) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    
    event.target.value = capitalizedText;
}





//?Invoice view
let invoiceView = document.getElementById("invoice-view");
let overlay = document.getElementById("overlay");

export async function openInvoice(event) {
  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  invoiceView.classList.add("toggle");
  overlay.classList.add("toggle");
  document.body.style.overflowY = 'hidden'
  const invoiceId = event.target.dataset.id;

  try {
    const response = await fetch(`/api/invoices/${invoiceId}`);

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
        <button id="close-invoice-btn" class="text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd" />
          </svg> Go back
        </button>
        <div class="flex flex-row gap-4">
          <button id="print-invoice-btn" class="text-white text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
          <button id="delete-invoice-btn" class="border border-purple-700 rounded-lg px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50" data-id="${_id}">Delete</button>
        </div>
      </header>
      <main id="invoice-img" class="bg-white px-4 py-2 md:px-8 md:py-4 rounded-lg">
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
    document.getElementById("close-invoice-btn").addEventListener("click", closeInvoice);
    document.getElementById("delete-invoice-btn").addEventListener("click", deleteInvoice);

  } catch (error) {
    console.error("Error fetching invoice:", error);
  }
}


//? Close invoice
export function closeInvoice() {
  invoiceView.classList.remove("toggle");
  overlay.classList.remove("toggle");
  document.body.style.overflowY = 'scroll'
}
// Make it global
window.closeInvoice = closeInvoice;

//? Delete invoice
async function deleteInvoice(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  const invoiceId = event.currentTarget.dataset.id;
  console.log(invoiceId);

  const invoiceAction = confirm("Are you sure to delete this invoice?");
  if (invoiceAction) {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show notification instead of alert
      showNotification("Invoice Deleted", result.message, "success");

      closeInvoice();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      let errorMessage = error.message.includes("404") ? "Invoice not found" : error.message;

      // Show error notification
      showNotification("Deletion Failed", errorMessage, "error");
    }
  }
}

//? Show Notification using Notification API
function showNotification(title, message, type) {
  // Check if the Notification API is supported
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: type === "success" ? "/path/to/success-icon.png" : "/path/to/error-icon.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, {
            body: message,
            icon: type === "success" ? "/path/to/success-icon.png" : "/path/to/error-icon.png",
          });
        }
      });
    }
  } else {
    console.error("Browser does not support notifications.");
  }
}



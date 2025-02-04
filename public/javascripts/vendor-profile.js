// Function to open invoice details
let invoiceView = document.getElementById("invoice-view");
let overlay = document.getElementById("overlay");

async function openInvoice(event) {
    
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
    
        // Convert updatedAt to a readable date format DD-MM-YYYY
        const date = new Date(createdAt);
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
             <main id="invoice-img " class="bg-white px-4 py-2 md:px-8 md:py-4 rounded-lg">
                 <div class="flex flex-col  justify-between">
                 <div class="flex flex-row justify-around ">
                 <div class="flex flex-col justify-center">
                 <p class="text-black text-xs md:text-lg"><b class="text-blue-300">#</b>${id}</p>
                 <p class="text-gray-400 text-xs md:text-base">Mr. ${name}</p>
                 </div>
                 <div class="flex flex-col py-3 justify-center">
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
                   <div class="flex flex-col justify-center items-center my-4">
                 <img src="${barcode}" class="w-96">
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
  
    const invoiceId = event.currentTarget.dataset.id;
    console.log(invoiceId);
  
    const invoiceAction = confirm('Are you sure to delete this invoice?')
    if (invoiceAction) {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`, { method: 'DELETE' })
  
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
        console.error("Error deleteing invoice:", error.message);
        if (error.message.includes("404")) {
          alert("invoice not Found")
        } else {
          console.error("Error deleteing invoice:" + error.message);
        }
      }
    }
    return;
  }
// Fetch invoices for the specific vendor ID
const vendorId = sessionStorage.getItem("vendorId");

document.addEventListener("DOMContentLoaded", async () => {
    const invoiceContainer = document.getElementById("invoice-collection");

    if (!vendorId) {
        invoiceContainer.innerHTML = "<p class='text-gray-500 text-center'>vendor ID not found</p>";
        return;
    }

    try {
        const response = await fetch(`/api/invoices?vendor=${encodeURIComponent(vendorId)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const invoices = await response.json();

        if (!invoices.length) {
            invoiceContainer.innerHTML = "<p class='text-gray-500 text-center'>No invoices found for this vendor</p>";
            return;
        }

        // Generate invoice cards dynamically
        invoiceContainer.innerHTML = invoices
            .filter(invoice => invoice.vendor === vendorId) // Additional vendor-side filtering
            .map(invoice => {
                const {
                    _id,
                    id,
                    name,
                    item_name,
                    item_weight,
                    total_price,
                    updatedAt
                } = invoice;

                // Convert updatedAt to a readable date format DD-MM-YYYY
                const date = new Date(updatedAt);
                const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
                    date.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}-${date.getFullYear()}`;

                return `
                    <div onclick="openInvoice(event)" data-id="${_id}" 
                        class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4 bg-white gap-7">
                        
                        <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                            <p class="text-black text-sm lg:text-base mb-2">
                                <b class="text-blue-300">#</b>${id}
                            </p>
                            <p class="text-gray-400 text-sm lg:text-sm">${formattedDate}</p>
                            <p class="text-gray-400 text-sm lg:text-sm capitalize">${name}</p>
                        </div>
                        <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                            <p class="text-gray-400 text-sm lg:text-sm capitalize">${item_name}</p>
                            <p class="text-gray-400 text-sm lg:text-sm"><b>Rs.${total_price}</b></p>
                            <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                `;
            })
            .join("");

    } catch (error) {
        console.error("Error fetching invoices:", error);
        invoiceContainer.innerHTML = "<p class='text-red-500 text-center'>Failed to load invoices</p>";
    }
});


//vendor Information
let vendorName = document.getElementById('vendorName'),
    vendorFatherName = document.getElementById('vendorFatherName'),
    vendorPhone = document.getElementById('vendorPhone'),
    vendorCnic = document.getElementById('vendorCnic');

    document.addEventListener('DOMContentLoaded', async ()=>{
        try {
            
            const response = await fetch(`/api/vendors/${vendorId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const vendor = await response.json();
            vendorName.textContent = vendor.name
            vendorFatherName.textContent = vendor.fatherName
            vendorPhone.textContent = vendor.contact
            vendorCnic.textContent = vendor.cnic
    
        } catch (error) {
            
        }
    })
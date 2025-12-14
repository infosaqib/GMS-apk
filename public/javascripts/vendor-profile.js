// Fetch invoices for the specific vendor ID
// Utils are loaded via utils.bundle.js
const vendorId = sessionStorage.getItem("vendorId");

document.addEventListener("DOMContentLoaded", async () => {
    const invoiceContainer = document.getElementById("invoice-collection");

    if (!vendorId) {
        invoiceContainer.innerHTML = "<p class='text-gray-500 text-center'>vendor ID not found</p>";
        return;
    }

    try {
        const response = await fetch(`/api/vendor-invoices?vendor=${encodeURIComponent(vendorId)}`);

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
                    name,
                    product,
                    quantity,
                    totalPrice,
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
                     <div id="openVendorInvoice" data-id="${_id}"
            class=" flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4 bg-white gap-7">
            <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                <p class="text-gray-400 text-sm lg:text-sm">
                    ${formattedDate}
                </p>
                <p class="text-gray-400 text-sm lg:text-sm capitalize">
                    ${name}
                </p>
                <p class="text-gray-400 text-sm lg:text-sm capitalize">
                    ${product}
                </p>
            </div>
            <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                <p class="text-gray-400 text-sm lg:text-sm capitalize">
                    ${quantity} Kg
                </p>
                <p class="text-gray-400 text-sm lg:text-sm">
                <b>Rs.${totalPrice}</b>
                </p>
                <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd" />
                </svg>
            </div>
        </div>
                `;
            })
            .join("");

        document.getElementById('openVendorInvoice').addEventListener('click', window.openVendorInvoice)

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

document.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch(`/api/vendors/${vendorId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const vendor = result.data;
        vendorName.textContent = vendor.name
        vendorFatherName.textContent = vendor.fatherName
        vendorPhone.textContent = vendor.contact
        vendorCnic.textContent = vendor.cnic

    } catch (error) {
        console.error("Error fetching vendor details:", error);
    }
})
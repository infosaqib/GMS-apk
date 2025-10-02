// Function to open invoice details
import { openClientInvoice } from "./utils.js";

// Fetch invoices for the specific client ID
const clientId = sessionStorage.getItem("clientId");

document.addEventListener("DOMContentLoaded", async () => {
    const invoiceContainer = document.getElementById("invoice-collection");

    if (!clientId) {
        invoiceContainer.innerHTML = "<p class='text-gray-500 text-center'>Client ID not found</p>";
        return;
    }

    try {
        const response = await fetch(`/api/client-invoices?client=${encodeURIComponent(clientId)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const invoices = await response.json();

        if (!invoices.length) {
            invoiceContainer.innerHTML = "<p class='text-gray-500 text-center'>No invoices found for this client</p>";
            return;
        }

        // Generate invoice cards dynamically
        invoiceContainer.innerHTML = invoices
            .filter(invoice => invoice.client === clientId) // Additional client-side filtering
            .map(invoice => {
                const {
                    _id,
                    id,
                    name,
                    item_name,
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
                    <div id="openClientInvoice" data-id="${_id}" 
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


        //Apply openinvoice
        document.getElementById('openClientInvoice').addEventListener('click', openClientInvoice)
    } catch (error) {
        console.error("Error fetching invoices:", error);
        invoiceContainer.innerHTML = "<p class='text-gray-400 text-center'>No invoices found</p>";
    }
});


//Client Information
let clientName = document.getElementById('clientName'),
    clientFatherName = document.getElementById('clientFatherName'),
    clientPhone = document.getElementById('clientPhone'),
    clientCnic = document.getElementById('clientCnic');

document.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch(`/api/clients/${clientId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const client = result.data;
        clientName.textContent = client.name
        clientFatherName.textContent = client.fatherName
        clientPhone.textContent = client.contact
        clientCnic.textContent = client.cnic

    } catch (error) {

    }
})
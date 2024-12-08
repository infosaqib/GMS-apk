//! Tracking Card Generator
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/invoices");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const invoices = await response.json();

        invoices.forEach((invoice) => {
            let { _id, id, name, item_name, updatedAt, status } = invoice;

            const date = new Date(updatedAt);
            const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;

            // const options = [
            //     { value: "ordered", text: "Ordered" },
            //     { value: "verified", text: "Verified" },
            //     { value: "processing", text: "Processing" },
            //     { value: "packed", text: "Packed" },
            //     { value: "returned", text: "Returned" },
            // ];

            // const optionsHtml = options.map(option => {
            //     return `<option value="${option.value}" ${option.value === status ? 'selected' : ''}>${option.text}</option>`;
            // }).join('');

            const trackingCardTemplate = `
                <div data-id="${_id}" class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 p-4 bg-white gap-7">
                    <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                        <p class="text-black text-sm lg:text-base mb-2"><b class="text-blue-300">#</b>${id}</p>
                        <p class="text-gray-400 text-sm lg:text-sm capitalize">${name}</p>
                    </div>
                    <div>
                        <p class="text-green-500 font-semibold text-lg"> ${status}</p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
                        <p class="text-gray-400 text-sm lg:text-sm capitalize">${item_name}</p>
                        <p class="text-gray-400 text-sm lg:text-sm">${formattedDate}</p>
                    </div>
                </div>
            `;
            let trackingGrid = document.getElementById("tracking-coll");
            trackingGrid.innerHTML += trackingCardTemplate;
        });
    } catch (error) {
        console.error("Error fetching invoices", error);
    }
});

// async function updateStatus(event) {
//     const selectElement = event.target;
//     const invoiceId = selectElement.getAttribute("data-id");
//     const newStatus = selectElement.value;

//     // Debug logging
//     console.log('Updating status for invoice:', {
//         invoiceId,
//         newStatus,
//         requestUrl: `/api/invoices/${invoiceId}`
//     });

//     try {
//         // Validate invoiceId
//         if (!invoiceId) {
//             throw new Error('invoice ID is missing');
//         }

//         const response = await fetch(`/api/invoices/${invoiceId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({ 
//                 status: newStatus 
//             })
//         });

//         // Log the response details
//         console.log('Response status:', response.status);
//         const responseData = await response.clone().text();
//         console.log('Response body:', responseData);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}, body: ${responseData}`);
//         }

//         console.log(`Successfully updated invoice ${invoiceId} status to ${newStatus}`);
//         window.location.reload();
//     } catch (error) {
//         console.error("Error updating status", {
//             error: error.message,
//             invoiceId,
//             newStatus
//         });
//         // Optionally show invoice feedback
//         alert(`Failed to update status: ${error.message}`);
//     }
// }
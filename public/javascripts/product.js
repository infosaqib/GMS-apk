let addPage = document.getElementById('add-product-page');
let updatePage = document.getElementById('update-product-page');
let overlay = document.getElementById('overlay');
let productContainer = document.getElementById('product-container');



function addProduct() {
    addPage.classList.toggle('show')
    overlay.classList.add('show')
    document.body.style.overflowY = 'hidden';

    const form = document.addProductForm;

    const { cleaning_price, granding_price, chrai_price, pinjai_price, filling_price, stiching_price, product_price, total_price } = form;

    const allInputs = [cleaning_price, granding_price, chrai_price, pinjai_price, filling_price, stiching_price, product_price];

    const updateTotal = () => {
        const total = allInputs.reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
        total_price.value = total;
    };
    allInputs.forEach(input => input.addEventListener('input', async (event) => await updateTotal(event)));
    updateTotal();
}

//?PINJAI PRICE FUNCTION
function updateStichFillDisplay() {
    const pinjai_priceInputs = document.querySelectorAll('.pinjai_price');
    const stichFillElement = document.getElementById('stichFill');

    if (!stichFillElement) {
        console.error("Element with id 'stichFill' not found!");
        return;
    }

    // Function to check and update display
    function checkAndUpdateDisplay() {
        let totalPinjai_price = 0;

        // Sum up all pinjai_price values
        pinjai_priceInputs.forEach(input => {
            const price = parseFloat(input.value) || 0;
            totalPinjai_price += price;
        });

        console.log("Total Pinjai Price:", totalPinjai_price);

        if (totalPinjai_price > 0) {
            console.log("Setting display to 'grid'");
            stichFillElement.style.display = 'grid';
        } else {
            console.log("Setting display to 'none'");
            stichFillElement.style.display = 'none';
        }

        console.log("Current stichFill display:", stichFillElement.style.display);
    }

    // Add event listeners to all pinjai_price inputs
    pinjai_priceInputs.forEach(input => {
        input.addEventListener('input', checkAndUpdateDisplay);
    });

    // Check initial values when page loads
    console.log("Initial check on page load");
    checkAndUpdateDisplay();
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");
    updateStichFillDisplay();
});

// Also check after a short delay to catch any dynamic content changes
setTimeout(() => {
    console.log("Delayed check");
    updateStichFillDisplay();
}, 500);

//CREATE API FUNCTION
document.addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.addProductForm);
    const addedProduct = Object.fromEntries(formData.entries());

    try {
        const addResponse = await fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedProduct),
        });

        if (!addResponse.ok) {
            const errorData = await addResponse.json();
            throw new Error(errorData.message || `HTTP error! status: ${addResponse.status}`);
        }

        const addedProductData = await addResponse.json();
        console.log('Product added successfully:', addedProductData);

        //refresh the product list here
        // window.location.href = '/product';
        // document.addProductForm.reset();
    } catch (error) {
        console.error('Error adding product:', error);
    }
})



function hideAddProduct() {
    addPage.classList.remove('show')
    overlay.classList.remove('show')
    document.body.style.overflowY = 'scroll';
}

// async function updateProduct(event) {
//     event.preventDefault();

//     if (!event || !event.target) {
//         console.error("Invalid event object");
//         return;
//     }

//     updatePage.classList.toggle('show')
//     overlay.classList.add('show')
//     document.body.style.overflowY = 'hidden';

//     const productId = event.target.closest('#myProduct').dataset.id
//     console.log(productId);


//     try {
//         const response = await fetch(`/api/products/${productId}`)
//         if (!response.ok) {
//             const errorData = await response.json()
//             throw new Error(errorData.message || `HTTP error! status:${response.status}`)
//         }

//         const product = await response.json();

//         let { product_name, granding_price, cleaning_price, total_price } = product

//         document.updateProductForm.up_product_name.value = product_name;
//         document.updateProductForm.up_granding_price.value = granding_price;
//         document.updateProductForm.up_cleaning_price.value = cleaning_price;
//         document.updateProductForm.up_total_price.value = total_price;

//     } catch (error) {
//         console.log('Error fetching product:', error)
//     }
//     // await fetch(`/api/products/${productId}`, { method: 'PUT' })

// }
async function updateProduct(event) {
    event.preventDefault();

    if (!event || !event.target) {
        console.error("Invalid event object");
        return;
    }

    updatePage.classList.toggle('show');
    overlay.classList.add('show');
    document.body.style.overflowY = 'hidden';

    const productId = event.target.closest('#myProduct').dataset.id;
    console.log(productId);

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const product = await response.json();

        const { product_name, granding_price, cleaning_price, chrai_price, pinjai_price, filling_price, stiching_price, total_price } = product;


        // Check pinjai_price and set stichFill display
        const stichFillElement = document.getElementById('stichFill');
        if (stichFillElement) {
            stichFillElement.style.display = parseFloat(pinjai_price) > 0 ? 'grid' : 'none';
        }


        const form = document.updateProductForm;
        const priceFields = ['up_granding_price', 'up_cleaning_price', 'up_chrai_price', 'up_pinjai_price', 'up_filling_price', 'up_stiching_price', 'up_product_price'];

        const updateTotal = () => {
            const total = priceFields.reduce((sum, field) => sum + (parseFloat(form[field].value) || 0), 0);
            form.up_total_price.value = total;
        };

        Object.entries({
            up_product_name: product_name,
            up_granding_price: granding_price,
            up_cleaning_price: cleaning_price,
            up_chrai_price: chrai_price,
            up_pinjai_price: pinjai_price,
            up_filling_price: filling_price,
            up_stiching_price: stiching_price,
            up_total_price: total_price
        }).forEach(([key, value]) => {
            form[key].value = value;
            if (priceFields.includes(key)) {
                form[key].addEventListener('input', updateTotal);
            }
        });

        updateTotal();

        // Add event listener to the form submission
        form.onsubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData(document.updateProductForm);
            const updatedProduct = Object.fromEntries(formData.entries());

            try {
                const updateResponse = await fetch(`/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                });

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    throw new Error(errorData.message || `HTTP error! status: ${updateResponse.status}`);
                }

                const updatedProductData = await updateResponse.json();
                console.log('Product updated successfully:', updatedProductData);

                // Close the update form and refresh the product list
                hideUpdateProduct();
                //refresh the product list here
                window.location.reload()
            } catch (error) {
                console.error('Error updating product:', error);
            }
        };

    } catch (error) {
        console.log('Error fetching product:', error);
    }
}

function hideUpdateProduct() {
    updatePage.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflowY = 'scroll';
}


//------------------------END UPDATE PRODUCT----------------------------------


//Product list Generator
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const productContainer = document.getElementById('product-container');

        productContainer.innerHTML += products.map(product => {
            const {
                _id,
                product_name,
                cleaning_price,
                granding_price,
                chrai_price,
                pinjai_price,
                filling_price,
                stiching_price,
                stocked_qty,
                product_price,
                total_price
            } = product;

            const priceFields = [
                ['Cleaning price', cleaning_price],
                ['Granding price', granding_price],
                ['Chrai price', chrai_price],
                ['Pinjai price', pinjai_price],
                ['Filling price', filling_price],
                ['Stiching price', stiching_price],
            ];

            return `
            <div id="myProduct" data-id="${_id}" class="h-full scale-95 flex flex-col justify-center border border-gray-300 bg-white rounded-lg py-4 px-5">
                <div class="flex flex-row justify-end items-center gap-4 py-6">
                    <div onclick="updateProduct(event)" class="flex flex-row items-center justify-center cursor-pointer border border-purple-500 bg-purple-600 hover:bg-purple-500 rounded-[100px] px-4 py-1 gap-3">
                        <p class="text-white text-base font-semibold">Edit</p>
                        <svg class="size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                    <div class="deleteButton flex flex-row items-center justify-center cursor-pointer border border-red-500 hover:bg-gray-50 rounded-[100px] px-3 py-1 gap-3">
                        <button class="text-red-500 text-base font-semibold">Delete</button>
                        <svg class="size-4 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-base">Product name</h1>
                    <p class="text-black text-base font-semibold">${product_name}</p>
                </div>
                <hr>
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-base">Stocked Qty</h1>
                    <p class="text-black text-base font-semibold">${stocked_qty} Kg</p>
                </div>
                <hr>
                ${priceFields.map(([label, price]) =>
                price > 0 && price !== null && price !== '' ? `
                        <div class="flex flex-row justify-between items-center px-3 py-4">
                            <h1 class="text-gray-400 text-base">${label}</h1>
                            <p class="text-black text-base font-semibold">Rs. ${price}</p>
                        </div>
                        <hr>
                    ` : ''
            ).join('')}
            ${product_price && product_price > 0 ? `
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-lg font-semibold">Product price <span class="text-xs">(per kg)</span> </h1>
                    <p class="text-black text-lg font-semibold">Rs. ${product_price}</p>
                </div>
            ` : ''}
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-lg font-semibold">Total price</h1>
                    <p class="text-black text-lg font-semibold">Rs. ${total_price}</p>
                </div>
            </div>`;
        }).join('');

        document.querySelectorAll('.deleteButton').forEach(button => button.addEventListener('click', async (event) => await deleteProduct(event)));
    } catch (error) {
        console.error('Error fetching products', error);
    }

    let deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach(button => { button.addEventListener('click', deleteProduct) })

    async function deleteProduct(event) {
        event.preventDefault();

        if (!event || !event.target) {
            console.error("Invalid event object");
            return;
        }

        const productId = event.target.closest('#myProduct').dataset.id;
        const productDiv = event.target.closest('#myProduct')

        const userAction = confirm('Are you sure to delete this product?')
        if (userAction) {
            try {
                const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || `HTTP error! status: ${response.status}`
                    );
                }

                const result = await response.json();
                alert(result.message);
                productDiv.remove();

            } catch (error) {
                if (error.message.includes("404")) {
                    alert("Product not Found")
                }
                console.error("Error deleteing product:", error.message);
            }
        }
    }
})

// document.updateProductForm.reset()


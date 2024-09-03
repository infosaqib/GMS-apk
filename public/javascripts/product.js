let addPage = document.getElementById('add-product-page');
let updatePage = document.getElementById('update-product-page');
let overlay = document.getElementById('overlay');
let productContainer = document.getElementById('product-container');



function addProduct() {
    addPage.classList.toggle('show')
    overlay.classList.add('show')
    let cleaningInput = document.addProductForm.cleaningPrice;
    let total = document.addProductForm.totalPrice;
    cleaningInput.addEventListener('input', () => {
        let cleaning = document.addProductForm.cleaningPrice.value;
        let granding = document.addProductForm.grandingPrice.value;
        total.value = parseFloat(granding) + parseFloat(cleaning);
    })
}
function hideAddProduct() {
    addPage.classList.remove('show')
    overlay.classList.remove('show')
}

// function updateProduct() {
//     updatePage.classList.toggle('show')
//     overlay.classList.add('show')
// }
// function hideUpdateProduct() {
//     updatePage.classList.remove('show')
//     overlay.classList.remove('show')
// }

//Product list Generator
document.addEventListener('DOMContentLoaded', async () => {
    try {
        response = await fetch('/products')
        const products = await response.json()

        products.forEach(product => {


            let productContainer = document.getElementById('product-container');
            let { _id, product_name, cleaning_price, granding_price, total_price } = product
            return productContainer.innerHTML += `
           <div id="myProduct"
               class=" h-[22em] scale-95 flex flex-col justify-center border border-gray-300 bg-white  rounded-lg py-4 px-5">
               <div class="flex flex-row justify-end items-center gap-4 py-6">
                   <div onclick="return updateProduct()"
                       class="flex flex-row items-center justify-center cursor-pointer border border-purple-500 bg-purple-600 hover:bg-purple-500 rounded-[100px] px-4 py-1 gap-3">
                       <p class="text-white text-base font-semibold">Edit</p>
                       <svg class="size-4 text-white " xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                           <path stroke-linecap="round" stroke-linejoin="round"
                               d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                       </svg>
                   </div>
                   <div data-id="${_id}"
                       class="deleteButton flex flex-row items-center justify-center cursor-pointer border border-red-500 hover:bg-gray-50  rounded-[100px] px-3 py-1 gap-3">
                       <button class="text-red-500 text-base font-semibold">Delete</button> <svg
                           class="size-4 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                           <path stroke-linecap="round" stroke-linejoin="round"
                               d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                       </svg>
                   </div>
               </div>
               <div class="flex flex-row justify-between items-center px-3 py-4">
                   <h1 class="text-gray-400 text-base">Product name</h1>
                   <p class="text-black text-base font-semibold">${product_name}</p>
               </div>
               <hr>
               <div class="flex flex-row justify-between items-center px-3 py-4">
                   <h1 class="text-gray-400 text-base">Cleaning price</h1>
                   <p class="text-black text-base font-semibold">Rs. ${cleaning_price}</p>
               </div>
               <hr>
               <div class="flex flex-row justify-between items-center px-3 py-4">
                   <h1 class="text-gray-400 text-base">Granding price</h1>
                   <p class="text-black text-base font-semibold">Rs. ${granding_price}</p>
               </div>
               <hr>
               <div class="flex flex-row justify-between items-center px-3 py-4">
                   <h1 class="text-gray-400 text-lg font-semibold">Total price</h1>
                   <p class="text-black text-lg font-semibold">Rs. ${total_price}</p>
               </div>
       </div> `

        });
    } catch (error) {
        console.error('Error fetching products', error);
    }


    let deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach(button => { button.addEventListener('click', deleteProduct) })



    function deleteProduct(event) {
        const productId = event.currentTarget.dataset.id
        const productDiv = event.target.closest('#myProduct')

        const userAction = confirm('Are you sure to delete this product?')
        if (userAction) {

            fetch(`/product/${productId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text)
                        })
                    }
                })
                .then(() => {
                    productDiv.remove();
                })
                .catch(error => {
                    console.error('Error:', error)
                })
        } else {
            console.log('Product not deleted');
        }
    }
})

// document.addProductForm.addEventListener("submit", (e) => {
//     e.preventDefault();
// });
document.updateProductForm.reset()
// document.updateProductForm.addEventListener("submit", (e) => {
//     e.preventDefault();
// });


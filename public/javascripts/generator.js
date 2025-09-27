

// function generateProduct() {
// let product = document.addProductForm.productName.value;
// let cleaning = document.addProductForm.cleaningPrice.value;
// let granding = document.addProductForm.grandingPrice.value;
// let total = document.addProductForm.totalPrice.value;
// return (productContainer.innerHTML += productItems.map((x) => {
//     let { product_name, cleaning_price, granding_price, total_price } = x
//     return `
// <div id="myProduct"
//     class=" h-[22em] scale-95 flex flex-col justify-center border border-gray-300 bg-white  rounded-lg py-4 px-5">
//     <div class="flex flex-row justify-end items-center gap-4 py-6">
//         <div onclick="return updateProduct()"
//             class="flex flex-row items-center justify-center cursor-pointer border border-purple-500 bg-purple-600 hover:bg-purple-600 rounded-[100px] px-4 py-1 gap-3">
//             <p class="text-white text-base font-semibold">Edit</p>
//             <svg class="size-4 text-white " xmlns="http://www.w3.org/2000/svg" fill="none"
//                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                     d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//             </svg>
//         </div>
//         <div onclick = "document.getElementById('myProduct').remove()"
//             class="flex flex-row items-center justify-center cursor-pointer border border-red-500 hover:bg-gray-50  rounded-[100px] px-3 py-1 gap-3">
//             <p class="text-red-500 text-base font-semibold">Delete</p> <svg
//                 class="size-4 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none"
//                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//             </svg>
//         </div>
//     </div>
//     <div class="flex flex-row justify-between items-center px-3 py-4">
//         <h1 class="text-gray-400 text-base">Product name</h1>
//         <p class="text-black text-base font-semibold">${product_name}</p>
//     </div>
//     <hr>
//     <div class="flex flex-row justify-between items-center px-3 py-4">
//         <h1 class="text-gray-400 text-base">Cleaning price</h1>
//         <p class="text-black text-base font-semibold">${cleaning_price} pkr</p>
//     </div>
//     <hr>
//     <div class="flex flex-row justify-between items-center px-3 py-4">
//         <h1 class="text-gray-400 text-base">Granding price</h1>
//         <p class="text-black text-base font-semibold">${granding_price} pkr</p>
//     </div>
//     <hr>
//     <div class="flex flex-row justify-between items-center px-3 py-4">
//         <h1 class="text-gray-400 text-lg font-semibold">Total price</h1>
//         <p class="text-black text-lg font-semibold">${total_price} pkr</p>
//     </div>


// </div>
// `
// }).join(''))
// document.addProductForm.reset()
// }
// generateProduct();









// function generateInvoice() {
//     return (invoiceView.innerHTML = invoiceItems.map(x => {

//       let { id, Name, Date, itemName, itemPrice, itemWeight, totalPrice } = x
//       return ` <header
//       class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center bg-white py-3 md:py-6 px-4 my-3 rounded-lg">
//       <button onclick="closeInvoice()"
//           class=" text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
//           <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
//               <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none"
//                   fill-rule="evenodd" />
//           </svg> Go back</button>
//       <div class="flex flex-row gap-4"> <button onclick="return printInvoice() "
//               class=" text-white text-sm md:text-lg px-3 md:px-4  py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
//           <button
//               class="border border-purple-700 rounded-lg px-3 md:px-4  py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50"
//               onclick="document.getElementById('invoice-list').remove();closeInvoice()">Delete</button>
//       </div>
//   </header>
//   <main id="invoice-img " class="bg-white p-2 md:p-4 rounded-lg">
//       <div class="flex flex-col  justify-between">
//           <div class="flex flex-col gap-4 md:block">
//               <div class="flex flex-col">
//                   <p class="text-black text-xs md:text-lg"><b class="text-blue-300">#</b>${id}</p>
//                   <p class="text-gray-400 text-xs md:text-base">Mr. ${Name}</p>
//               </div>
//               <div class="flex flex-col py-3">
//                   <p class="text-gray-400 text-xs md:text-lg  font-thin">Invoice Date</p>
//                   <p class="text-black font-bold text-xs md:text-base">${Date}</p>
//               </div>
//               <!-- <div class="flex flex-col py-3">
//               <p class="text-gray-400 text-xs md:text-lg font-thin">Payment method</p>
//               <p class="text-black font-bold text-xs md:text-base">Cash on dilivery</p>
//           </div>
//           <div class="flex flex-col py-3">
//               <p class="text-gray-400 text-xs md:text-lg font-thin">Payment action</p>
//               <p class="text-black font-bold text-xs md:text-base">pending</p>
//           </div> -->
//           </div>
//           <div
//               class="flex flex-row   items-start   justify-evenly bg-gray-100 rounded-lg md:rounded-t-xl md:mx-8 mt-0 md:mt-6 p-2">
//               <div class="flex flex-col p-2">
//                   <p class="text-gray-400 text-xs md:text-base">Item name</p>
//                   <p class="text-black font-bold text-xs md:text-base">${itemName}</p>
//               </div>
//               <div class="flex flex-col p-2">
//                   <p class="text-gray-400 text-xs md:text-base">Qty.</p>
//                   <p class="text-black font-bold text-xs md:text-base">${itemWeight} kg</p>
//               </div>
//               <div class="flex flex-col p-2">
//               <p class="text-gray-400 text-xs md:text-base">Item price</p>
//               <p class="text-black font-bold text-xs md:text-base">Rs.${itemPrice}</p>
//           </div>
//               <div class="flex flex-col p-2">
//                   <p class="text-gray-400 text-xs md:text-base">Total</p>
//                   <p class="text-black font-bold text-xs md:text-base">Rs.${totalPrice}</p>
//               </div>
//           </div>

//       </div>
//       <div class="flex flex-row items-center justify-between bg-gray-700 p-3 md:p-6 rounded-lg">
//           <h1 class="text-white text-sm md:text-lg font-bold">Amount Due</h1>
//           <p class="text-white text-sm md:text-lg font-bold">Rs.${totalPrice}</p>
//       </div>
//   </main>`
//     })
//     )
//   }
//   generateInvoice()



// Product menu generator
// const productModel = require('../../models/product');
// const { response } = require('../../app');
// const product = require('../../models/product');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    response = await fetch('/api')
    const products = await response.json()

    products.forEach(product => {


      //Menu Options Generator
      let productMenu = document.getElementById('productMenu');
      return productMenu.innerHTML += `<option value="${product.product_name}">${product.product_name}</option>`

    }

    );
  } catch (error) {
    console.error('Error fetching products', error);
  }
})


// function generateMenu() {
//   return (productMenu.innerHTML += productItems.map((x) => {
//     let { product_name, id } = x;
//     return `<option value="${product_name}">${product_name}</option>`
//   }).join(''))
// };
// generateMenu();



// const userModel = require('../../models/users')
// const invoiceItems = userModel.find();
// console.log(invoiceItems)
// //Generate invoice function
// function generateInvoiceCard() {

//   invoices.innerHTML = invoiceItems.map((x) => {
//     let { id, date, name, item_name, total_price } = x;
//     return `
//           <div onclick="openInvoice()" id="invoice-list" class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4 bg-white gap-7">
//             <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
//               <p class="text-black text-sm lg:text-base mb-2"><b class="text-blue-300">#</b>${id}</p>
//               <p class="text-gray-400 text-sm lg:text-sm">${date}</p>
//               <p class="text-gray-400 text-sm lg:text-sm">${name}</p>
//             </div>
//             <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
//               <p class="text-gray-400 text-sm lg:text-sm">${item_name}</p>
//               <p class="text-gray-400 text-sm lg:text-sm">${total_price}</p>
//               <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/>
//               </svg>
//             </div>
//           </div>
//         `;
//   }).join('');
// }


// generateInvoiceCard();
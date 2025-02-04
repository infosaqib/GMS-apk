let addPage = document.getElementById("add-client-page");
let updatePage = document.getElementById("update-client-page");
let overlay = document.getElementById("overlay");
let clientContainer = document.getElementById("client-container");

//? Session storage
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelectorAll(".client-profile-btn");
  button.forEach(btn => btn.addEventListener("click", (event) => {
    const clientId = event.target.closest("#myClient").dataset.id;
    sessionStorage.setItem("clientId", clientId);
  }))
})

function addClient() {
  addPage.classList.toggle("show");
  overlay.classList.add("show");
  document.body.style.overflowY = "hidden";
}

//UPDATE Client DATA
async function updateClient(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  updatePage.classList.toggle("show");
  overlay.classList.add("show");
  document.body.style.overflowY = "hidden";

  const clientId = event.target.closest("#myClient").dataset.id;
  console.log(clientId);

  try {
    const response = await fetch(`/api/clients/${clientId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const client = await response.json();

    const { name, fatherName, contact, cnic } = client;

    const form = document.updateClientForm;

    Object.entries({
      up_name: name,
      up_fatherName: fatherName,
      up_contact: contact,
      up_cnic: cnic,
    }).forEach(([key, value]) => {
      form[key].value = value;
    });

    // Add event listener to the form submission

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const updatedClient = Object.fromEntries(formData.entries());

      try {
        const updateResponse = await fetch(`/api/clients/${clientId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClient),
        });

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${updateResponse.status}`
          );
        }

        const updatedClientData = await updateResponse.json();
        console.log("Client updated successfully:", updatedClientData);

        // Close the update form
        hideUpdateClient();
        //refresh the client list here
        window.location.reload();
      } catch (error) {
        console.error("Error updating client:", error);
      }
    });
  } catch (error) {
    console.log("Error fetching client:", error);
  }
}

//CREATE API FUNCTION
document.addClientForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(document.addClientForm);
  const addedClient = Object.fromEntries(formData.entries());

  try {
    const addResponse = await fetch("/api/clients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedClient),
    });

    if (!addResponse.ok) {
      const errorData = await addResponse.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${addResponse.status}`
      );
    }

    const addedClientData = await addResponse.json();
    console.log("Client added successfully:", addedClientData);

    //refresh the client list here
    hideAddClient();
    document.addClientForm.reset();
    window.location.reload();
  } catch (error) {
    console.error("Error adding client:", error);
  }
});

function hideAddClient() {
  addPage.classList.remove("show");
  overlay.classList.remove("show");
  document.body.style.overflowY = "scroll";
}

function hideUpdateClient() {
  updatePage.classList.remove("show");
  overlay.classList.remove("show");
  document.body.style.overflowY = "scroll";
}

// Add event listener to the form submission
// form.onsubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(document.updateClientForm);
//     const updatedClient = Object.fromEntries(formData.entries());

//     try {
//         const updateResponse = await fetch(`/api/clients/${clientId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedClient),
//         });

//         if (!updateResponse.ok) {
//             const errorData = await updateResponse.json();
//             throw new Error(errorData.message || `HTTP error! status: ${updateResponse.status}`);
//         }

//         const updatedClientData = await updateResponse.json();
//         console.log('Client updated successfully:', updatedClientData);

//         // Close the update form and refresh the client list
//         hideUpdateClient();
//         //refresh the client list here
//         window.location.reload()
//     } catch (error) {
//         console.error('Error updating client:', error);
//     }
// };

//------------------------END UPDATE Client----------------------------------

//Client list Generator
// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("/api/clients");
//     const clients = await response.json();
//     const clientContainer = document.getElementById("client-container");

//     clientContainer.innerHTML += clients
//       .map((x) => {
//         const { _id, name, fatherName, contact, cnic } = x;

//         return `
//             <div id="myClient" data-id="${_id}" class="h-full scale-95 flex flex-col justify-center border border-gray-300 bg-white rounded-lg py-4 px-5">
//             <div class="flex flex-row justify-start items-center gap-4 py-6">
//             <div class="mr-auto border border-gray-200  px-3 py-2 rounded-md ">

//                    <a href="/clients/client-profile" class="flex flex-row gap-2 items-center justify-center cursor-pointer">
//                      <svg class="size-6 cursor-pointer" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#9333ea" d="m256 288c79.5 0 144-64.5 144-144s-64.5-144-144-144-144 64.5-144 144 64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-55.1c-70.7 0-128 57.3-128 128v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"/></svg>
//                    <p class="text-gray-500 text-base">Profile</p>
//                   </a>
//                   </div>
//                     <div onclick="updateClient(event)" class=" flex flex-row items-center justify-center cursor-pointer border border-purple-500 bg-purple-600 hover:bg-purple-500 rounded-[100px] px-4 py-1 gap-3">

//                         <svg class="size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                         </svg>
//                     </div>
//                     <div class="deleteButton flex flex-row items-center justify-center cursor-pointer border border-red-500 hover:bg-gray-50 rounded-[100px] px-3 py-1 gap-3">

//                         <svg class="size-4 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                         </svg>
//                     </div>
//                 </div>
//                 <div class="flex flex-row justify-between items-center px-3 py-4">
//                     <h1 class="text-gray-400 text-base">Name</h1>
//                     <p class="text-black text-base font-semibold">${name}</p>
//                 </div>
//                 <hr>
//                 <div class="flex flex-row justify-between items-center px-3 py-4">
//                     <h1 class="text-gray-400 text-base">Father name</h1>
//                     <p class="text-black text-base font-semibold">${fatherName}</p>
//                 </div>
//                 <hr>
//                 <div class="flex flex-row justify-between items-center px-3 py-4">
//                     <h1 class="text-gray-400 text-base">Contact</h1>
//                     <p class="text-black text-base font-semibold">${contact}</p>
//                 </div>
//                 <hr>
//                 <div class="flex flex-row justify-between items-center px-3 py-4">
//                     <h1 class="text-gray-400 text-base">CNIC</h1>
//                     <p class="text-black text-base font-semibold">${cnic}</p>
//                 </div>
//             </div>`;
//       })
//       .join("");

//     document
//       .querySelectorAll(".deleteButton")
//       .forEach((button) => button.addEventListener("click", deleteClient));
//   } catch (error) {
//     console.error("Error fetching clients", error);
//   }

//   let deleteButton = document.querySelectorAll(".deleteButton");
//   deleteButton.forEach((button) => {
//     button.addEventListener("click", deleteClient);
//   });

//   async function deleteClient(event) {
//     event.preventDefault();

//     if (!event || !event.target) {
//       console.error("Invalid event object");
//       return;
//     }

//     const clientId = event.target.closest("#myClient").dataset.id;
//     const clientDiv = event.target.closest("#myClient");

//     const clientAction = confirm("Are you sure to delete this client?");
//     if (clientAction) {
//       try {
//         const response = await fetch(`/api/clients/${clientId}`, {
//           method: "DELETE",
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || `HTTP error! status: ${response.status}`
//           );
//         }

//         const result = await response.json();
//         alert(result.message);
//         clientDiv.remove();
//       } catch (error) {
//         if (error.message.includes("404")) {
//           alert("Client not Found");
//         }
//         console.error("Error deleteing client:", error.message);
//       }
//     }
//   }
// });

// document.updateClientForm.reset()

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

    const result = await response.json();
    const client = result.data;

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

//CREATE CLIENT 
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

    //refresh the client list here
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


//DELETE Client

let deleteButton = document.querySelectorAll(".deleteButton");
deleteButton.forEach((button) => {
  button.addEventListener("click", deleteClient);
});

async function deleteClient(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  const clientId = event.target.closest("#myClient").dataset.id;
  const clientDiv = event.target.closest("#myClient");

  const clientAction = confirm("Are you sure to delete this client?");
  if (clientAction) {
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      alert(result.message);
      clientDiv.remove();
    } catch (error) {
      if (error.message.includes("404")) {
        alert("Client not Found");
      }
      console.error("Error deleteing client:", error.message);
    }
  }
}

// document.updateClientForm.reset()

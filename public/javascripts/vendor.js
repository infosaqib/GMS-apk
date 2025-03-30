let addPage = document.getElementById('add-vendor-page');
let updatePage = document.getElementById('update-vendor-page');
let overlay = document.getElementById('overlay');
let vendorContainer = document.getElementById('vendor-container');

//? Session storage
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelectorAll(".vendor-profile-btn");
    button.forEach(btn => btn.addEventListener("click", (event) => {
      const vendorId = event.target.closest("#myVendor").dataset.id;
      sessionStorage.setItem("vendorId", vendorId);
    }))
  })
  


function addVendor() {
    addPage.classList.toggle('show')
    overlay.classList.add('show')
    document.body.style.overflowY = 'hidden';
}

//UPDATE Vendor DATA
async function updateVendor(event) {
    event.preventDefault();

    if (!event || !event.target) {
        console.error("Invalid event object");
        return;
    }


    updatePage.classList.toggle('show')
    overlay.classList.add('show')
    document.body.style.overflowY = 'hidden';


    const vendorId = event.target.closest('#myVendor').dataset.id;
    console.log(vendorId);


    try {
        const response = await fetch(`/api/vendors/${vendorId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const vendor = await response.json();

        const { name, fatherName, contact, cnic } = vendor;




        const form = document.updateVendorForm;

        Object.entries({
            up_name: name,
            up_fatherName: fatherName,
            up_contact: contact,
            up_cnic: cnic
        }).forEach(([key, value]) => {
            form[key].value = value;
        });


        // Add event listener to the form submission

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const updatedVendor = Object.fromEntries(formData.entries());

            try {
                const updateResponse = await fetch(`/api/vendors/${vendorId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedVendor),
                });

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    throw new Error(errorData.message || `HTTP error! status: ${updateResponse.status}`);
                }

                const updatedVendorData = await updateResponse.json();
                console.log('Vendor updated successfully:', updatedVendorData);

                // Close the update form 
                hideUpdateVendor();
                //refresh the Vendor list here
                window.location.reload()
            } catch (error) {
                console.error('Error updating Vendor:', error);
            }
        })

    } catch (error) {
        console.log('Error fetching Vendor:', error);
    }

}


//CREATE API FUNCTION
document.addVendorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.addVendorForm);
    const addedVendor = Object.fromEntries(formData.entries());

    try {
        const addResponse = await fetch('/api/vendors/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedVendor),
        });

        if (!addResponse.ok) {
            const errorData = await addResponse.json();
            throw new Error(errorData.message || `HTTP error! status: ${addResponse.status}`);
        }

        const addedVendorData = await addResponse.json();
        console.log('Vendor added successfully:', addedVendorData);

        //refresh the Vendor list here
        hideAddVendor();
        document.addVendorForm.reset();
        window.location.reload();
    } catch (error) {
        console.error('Error adding Vendor:', error);
    }
})



function hideAddVendor() {
    addPage.classList.remove('show')
    overlay.classList.remove('show')
    document.body.style.overflowY = 'scroll';
}

function hideUpdateVendor() {
    updatePage.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflowY = 'scroll';
}


//DELETE Vendor

let deleteButton = document.querySelectorAll(".deleteButton");
deleteButton.forEach((button) => {
  button.addEventListener("click", deleteVendor);
});

async function deleteVendor(event) {
  event.preventDefault();

  if (!event || !event.target) {
    console.error("Invalid event object");
    return;
  }

  const vendorId = event.target.closest("#myVendor").dataset.id;
  const vendorDiv = event.target.closest("#myVendor");

  const vendorAction = confirm("Are you sure to delete this vendor?");
  if (vendorAction) {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
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
      vendorDiv.remove();
    } catch (error) {
      if (error.message.includes("404")) {
        alert("vendor not Found");
      }
      console.error("Error deleteing vendor:", error.message);
    }
  }
}

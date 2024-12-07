let addPage = document.getElementById('add-profile-page');
let updatePage = document.getElementById('update-profile-page');
let overlay = document.getElementById('overlay');
let profileContainer = document.getElementById('profile-container');



function addProfile() {
    addPage.classList.toggle('show')
    overlay.classList.add('show')
    document.body.style.overflowY = 'hidden';
}

//UPDATE PROFILE DATA
async function updateProfile(event) {
    event.preventDefault();

    if (!event || !event.target) {
        console.error("Invalid event object");
        return;
    }


    updatePage.classList.toggle('show')
    overlay.classList.add('show')
    document.body.style.overflowY = 'hidden';


    const profileId = event.target.closest('#myProfile').dataset.id;
    console.log(profileId);


    try {
        const response = await fetch(`/api/profiles/${profileId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const profile = await response.json();

        const { name, fatherName, contact, cnic } = profile;




        const form = document.updateProfileForm;

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
            const updatedProfile = Object.fromEntries(formData.entries());

            try {
                const updateResponse = await fetch(`/api/profiles/${profileId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProfile),
                });

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    throw new Error(errorData.message || `HTTP error! status: ${updateResponse.status}`);
                }

                const updatedProfileData = await updateResponse.json();
                console.log('Profile updated successfully:', updatedProfileData);

                // Close the update form 
                hideUpdateProfile();
                //refresh the profile list here
                window.location.reload()
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        })

    } catch (error) {
        console.log('Error fetching profile:', error);
    }

}


//CREATE API FUNCTION
document.addProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.addProfileForm);
    const addedProfile = Object.fromEntries(formData.entries());

    try {
        const addResponse = await fetch('/api/profiles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedProfile),
        });

        if (!addResponse.ok) {
            const errorData = await addResponse.json();
            throw new Error(errorData.message || `HTTP error! status: ${addResponse.status}`);
        }

        const addedProfileData = await addResponse.json();
        console.log('Profile added successfully:', addedProfileData);

        //refresh the profile list here
        hideAddProfile();
        document.addProfileForm.reset();
        window.location.reload();
    } catch (error) {
        console.error('Error adding profile:', error);
    }
})



function hideAddProfile() {
    addPage.classList.remove('show')
    overlay.classList.remove('show')
    document.body.style.overflowY = 'scroll';
}

function hideUpdateProfile() {
    updatePage.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflowY = 'scroll';
}


// Add event listener to the form submission
// form.onsubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(document.updateProfileForm);
//     const updatedProfile = Object.fromEntries(formData.entries());

//     try {
//         const updateResponse = await fetch(`/api/profiles/${profileId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedProfile),
//         });

//         if (!updateResponse.ok) {
//             const errorData = await updateResponse.json();
//             throw new Error(errorData.message || `HTTP error! status: ${updateResponse.status}`);
//         }

//         const updatedProfileData = await updateResponse.json();
//         console.log('Profile updated successfully:', updatedProfileData);

//         // Close the update form and refresh the profile list
//         hideUpdateProfile();
//         //refresh the profile list here
//         window.location.reload()
//     } catch (error) {
//         console.error('Error updating profile:', error);
//     }
// };



//------------------------END UPDATE PROfile----------------------------------


//Profile list Generator
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profiles');
        const profiles = await response.json();
        const profileContainer = document.getElementById('profile-container');

        profileContainer.innerHTML += profiles.map(x => {
            const { _id, name, fatherName, contact, cnic } = x;


            return `
            <div id="myProfile" data-id="${_id}" class="h-full scale-95 flex flex-col justify-center border border-gray-300 bg-white rounded-lg py-4 px-5">
                <div class="flex flex-row justify-end items-center gap-4 py-6">
                    <div onclick="updateProfile(event)" class="flex flex-row items-center justify-center cursor-pointer border border-purple-500 bg-purple-600 hover:bg-purple-500 rounded-[100px] px-4 py-1 gap-3">
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
                    <h1 class="text-gray-400 text-base">Name</h1>
                    <p class="text-black text-base font-semibold">${name}</p>
                </div>
                <hr>
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-base">Father name</h1>
                    <p class="text-black text-base font-semibold">${fatherName}</p>
                </div>
                <hr>
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-base">Contact</h1>
                    <p class="text-black text-base font-semibold">${contact}</p>
                </div>
                <hr>
                <div class="flex flex-row justify-between items-center px-3 py-4">
                    <h1 class="text-gray-400 text-base">CNIC</h1>
                    <p class="text-black text-base font-semibold">${cnic}</p>
                </div>
            </div>`;
        }).join('');

        document.querySelectorAll('.deleteButton').forEach(button => button.addEventListener('click', deleteProfile));
    } catch (error) {
        console.error('Error fetching profiles', error);
    }


    let deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach(button => { button.addEventListener('click', deleteProfile) })



    async function deleteProfile(event) {

        event.preventDefault();

        if (!event || !event.target) {
            console.error("Invalid event object");
            return;
        }

        const profileId = event.target.closest('#myProfile').dataset.id;
        const profileDiv = event.target.closest('#myProfile')

        const clientAction = confirm('Are you sure to delete this profile?')
        if (clientAction) {
            try {
                const response = await fetch(`/api/profiles/${profileId}`, { method: 'DELETE' })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || `HTTP error! status: ${response.status}`
                    );
                }

                const result = await response.json();
                alert(result.message);
                profileDiv.remove();

            } catch (error) {
                if (error.message.includes("404")) {
                    alert("Profile not Found")
                }
                console.error("Error deleteing profile:", error.message);
            }
        }
    }
})

// document.updateProfileForm.reset()


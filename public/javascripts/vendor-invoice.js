//* Get references to the form fields
const
    vendorForm = document.forms.vendorForm,
    nameInput = document.forms.vendorForm.name,
    fatherNameInput = document.forms.vendorForm.father_name,
    contactInput = document.forms.vendorForm.contact,
    cnicInput = document.forms.vendorForm.cnic,
    quantityInput = document.forms.vendorForm.quantity,
    pricePerUnitInput = document.forms.vendorForm.pricePerUnit,
    totalPriceField = document.forms.vendorForm.totalPrice;

//* Calculate total price
function TotalPrice() {
    const quantity = parseFloat(quantityInput.value) || 0;
    const pricePerUnit = parseFloat(pricePerUnitInput.value) || 0;
    const totalPrice = quantity * pricePerUnit;
    totalPriceField.value = totalPrice; // Round to 2 decimal places
}

// Add event listeners to quantity and price per unit inputs
quantityInput.addEventListener('input', TotalPrice);
pricePerUnitInput.addEventListener('input', TotalPrice);

//* CREATE INVOICE FUNCTION
vendorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const invoiceData = new FormData(vendorForm);
    const newinvoice = Object.fromEntries(invoiceData.entries());

    console.log("Invoice Data being sent...",);

    try {
        const response = await fetch('/api/vendor-invoices/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newinvoice),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Response from API:", errorData); // Debugging Line
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // const newinvoiceData = await response.json();
        console.log('Invoice added successfully...');

        // Refresh the page or update the UI
        vendorForm.reset();
    } catch (error) {
        console.error('Error creating invoice:', error);
    }
});


  //* AUTO-FILL VENDOR'S DETAILS
  function debounce(func, wait) {

    let timeout;
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait);
    }
  }
  
  //* FETCH VENDOR'S DETAILS
  document.addEventListener('DOMContentLoaded', () => {
    let vendors = [];
  
    fetch('/api/vendors')
      .then(response => response.json())
      .then(data => vendors = data)
      .catch(error => console.log('Error fetching vendor data:', error))
  
    const handleInput = () => {
  
      const inputValue = contactInput.value.trim();
  
      // Ensure at least 3 chracters are entered
      if (inputValue.length < 10) {
        fatherNameInput.value = '';
        nameInput.value = '';
        cnicInput.value = '';
        return;
      }
  
      // Create a regex to match the input value (case insensitive)
      const regex = new RegExp(`^${inputValue}`, 'i');
  
      // Find the invoice that matches the input name using regex
      const vendor = vendors.find(vendor => regex.test(vendor.contact));
  
      if (vendor) {
        // Auto-fill the Father's Name and Email fields
        nameInput.value = vendor.name;
        fatherNameInput.value = vendor.fatherName;
        cnicInput.value = vendor.cnic;
      } else {
        // Clear the fields if no match is found
        nameInput.value = '';
        fatherNameInput.value = '';
        cnicInput.value = '';
      }
    }
  
    // Add event listener to the Name input field with debounce
    contactInput.addEventListener('input', debounce(handleInput, 300));
  })
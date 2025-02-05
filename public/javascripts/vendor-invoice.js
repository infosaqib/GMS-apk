// Get references to the form fields
const quantityInput = document.getElementById('quantity');
const pricePerUnitInput = document.getElementById('pricePerUnit');
const totalPriceField = document.getElementById('totalPrice');

// Function to calculate total price
function TotalPrice() {
    const quantity = parseFloat(quantityInput.value) || 0;
    const pricePerUnit = parseFloat(pricePerUnitInput.value) || 0;
    const totalPrice = quantity * pricePerUnit;
    totalPriceField.value = totalPrice; // Round to 2 decimal places
}

// Add event listeners to quantity and price per unit inputs
quantityInput.addEventListener('input', TotalPrice);
pricePerUnitInput.addEventListener('input', TotalPrice);

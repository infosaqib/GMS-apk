//? Capitalize Text
export function capitalizeText(event) {
    // Get the input value
    let text = event.target.value;
    
    // Split by spaces, capitalize each word, and rejoin
    let capitalizedText = text.split(' ').map(word => {
        if (word.length === 0) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    
    // Update the input value
    event.target.value = capitalizedText;
}
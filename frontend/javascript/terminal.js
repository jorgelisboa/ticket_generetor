function passarCartao() {
    // BaseURL
    const baseUrl = 'http://localhost:5000/api'
    
    // Get text value from input
    const cardNumber = document.getElementById('card_field').value

    // Faz o POST no endpoint
    const promisse = fetch(
        `${baseUrl}/terminal`, {
            method: 'POST',
            headers: { 'Access-Control-Allow-Origin' : '*', },
            body: { cardNumber: cardNumber, },
        }
    )
}
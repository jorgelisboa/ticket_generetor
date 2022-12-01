const passarCartao = (evt) => {
    
    console.log(evt)

    // BaseURL
    const baseUrl = 'http://localhost:5000/api'
    
    // Get text value from input
    const codigo_bilhete = document.getElementById('card_field').value

    axios
    .post(`${baseUrl}/terminal`, { codigo_bilhete })
    .then((response) => {
      if (response.data.status == 200)
        //Ir pra página do cartão gerado (levar valores do cartão)
        console.log('Bilhete utilizado.', response.data)
    })
    .catch((error) => {
      console.log('err',error.request.response);
    });
}
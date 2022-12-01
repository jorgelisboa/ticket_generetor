function getHistoric(numeroBilhete){
   // BaseURL
   let historicoBilhete
   const baseUrl = 'http://localhost:5000/api'
   axios.get(`${baseUrl}/recargas/${numeroBilhete}`)
   .then((response) => {
     if (response.data.status == 200)
       //Ir pra página do cartão gerado (levar valores do cartão)
       console.log('Bilhete utilizado.', response.data)
    historicoBilhete = response.data
   })
   .catch((error) => {
     console.log('err',error.request.response);
   });
    return historicoBilhete
}

function getNumeroBilhete(){
    return document.getElementById("historic_input").value
}

function criarLinhasTabelas(listaDoHistorico){
    let tabela = document.getElementById("tabela_historico")
    // acahar minha tabela no html usando o id
    let linhas
    for (let index = 0; index < listaDoHistorico.length; index++) {
      linhas = `<tr>
      <td>${listaDoHistorico[index].horario}</td>
      <td>${listaDoHistorico[index].status}</td>
      <td>${listaDoHistorico[index].tipoRecargas}</td>
      </tr>`  
    }
    // criar o html de uma linha da tebela.

    tabela.innerHTML = linhas
    // colocar no doc html essa mudanças
}


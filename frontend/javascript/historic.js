async function getHistoric(numeroBilhete){
   console.log("entrei no request");// BaseURL
   let historicoBilhete
   const baseUrl = 'http://localhost:5000/api'
   await axios.get(`${baseUrl}/recargas/${numeroBilhete}`)
   .then((response) => {
     if (response.data.status == 200)
       //Ir pra página do cartão gerado (levar valores do cartão)
       console.log('Bilhete utilizado.', response.data)
    
       historicoBilhete = response.data
   console.log(historicoBilhete);
      })
   .catch((error) => {
     console.log('err',error.request.response);
   });
   console.log(historicoBilhete);
      criarLinhasTabelas(historicoBilhete)
}


function getNumeroBilhete(){
    return document.getElementById("historic_input").value 
    // if (document.getElementById("historic_input").value == "" || document.getElementById("historic_input").value.length)
}
 
function criarLinhasTabelas(listaDoHistorico){
    let tabela = document.getElementById("tabela_historico")
    // acahar minha tabela no html usando o id
    let linhas
    console.log(typeof(listaDoHistorico));
    for (let index = 0; index < listaDoHistorico.length; index++) {
      linhas = `<tr>
      <td>${listaDoHistorico[index].DATA_EXPIRACAO}</td>
      <td>${listaDoHistorico[index].TIPO}</td>
      <td>${listaDoHistorico[index].DATA_RECARGA}</td>
      </tr>`
      console.log(linhas);
    }
    // criar o html de uma linha da tebela.

    tabela.innerHTML = linhas
    // colocar no doc html essa mudanças
}
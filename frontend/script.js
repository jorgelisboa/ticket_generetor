let bilhete;
const baseUrl = "http://localhost:5000/api"

async function getBilhete(){
    console.log("gerando bilhete")

    //fazendo o get 
    // const response = await fetch(`${baseUrl}/bilhetes`, {
    //     method: 'GET',
    // })
    // .then((response) => console.log(response.json()))
    // .then((json) =>{
    //     console.log(json)
    //     bilhete = json
    //     //console.log(bilhete.codigo);
    // })

    axios.get(`${baseUrl}/bilhetes`)
	.then(response => {
		console.log(response)		
	})
	.catch(error  =>  {
        console.log(error)	
	})

}
function gerarBilhete(){
    console.log("entrou na gerar bilhete");

    //Criar cartão na API
    getBilhete()
    //Ir pra página do cartão gerado (levar valores do cartão)
    console.log(bilhete)
    //window.open("http://localhost:5500/frontend/pages/created.html?cod="+bilhete, "_self");
}
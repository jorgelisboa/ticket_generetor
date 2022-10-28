const baseUrl = "http://localhost:5000/api"

getBilhete = async () => {
    axios.get(`${baseUrl}/bilhetes`)
	.then(response => {
		console.log(response)		
        const date = new Date(`${response.data.DATA_GERACAO}`).toLocaleString()
        const bilhete = response.data.NUMERO

        //Ir pra página do cartão gerado (levar valores do cartão)
        window.open("http://localhost:5500/frontend/pages/created.html?cod="+bilhete+"&date="+date, "_self");
    })
	.catch(error  =>  {
        console.log(error)	
	})

}
const gerarBilhete = () => {
    //Criar cartão na API
    getBilhete();
}
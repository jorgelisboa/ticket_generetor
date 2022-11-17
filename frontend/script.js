const baseUrl = "http://localhost:5000/api"

const abrirModal = (tipo) => {
    const modal = document.getElementById('modal-one');
    modal.classList.add('open');
    const exits = modal.querySelectorAll('.modal-exit');
    exits.forEach(function (exit) {
      exit.addEventListener('click', function (event) {
        event.preventDefault();
        modal.classList.remove('open');
      });
    });

    document.getElementById('recharge_btn').setAttribute('data', tipo)
}

    
const confirmarRecarga = () => {
    const tipo = parseInt(document.getElementById('recharge_btn').getAttribute('data'))
    const codigo_bilhete = document.getElementById('codigo_bilhete').value

    axios.post(`${baseUrl}/recarga`, {codigo_bilhete, tipo})
	.then(response => {
		if (response.data.status == 200)	
            window.open("http://localhost:5500/frontend/pages/recharged.html");

        //Ir pra página do cartão gerado (levar valores do cartão)
    })
	.catch(error  =>  {
        console.log(error)	
	})
}

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
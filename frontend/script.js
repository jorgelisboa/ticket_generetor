let bilhete;
const baseUrl = "http://localhost:5000/api"

async function gerarBilhete(){
    console.log("gerando bilhete")

    //fazendo o get 
    const response = await fetch(baseUrl+"/bilhetes", {
        method: 'GET',
        
    })
    .then((response) =>response.json())
    .then((json) =>{
        console.log(json)
        bilhete = json
        console.log(bilhete.codigo);
    })

}

gerarBilhete()
console.log("aaaaa");
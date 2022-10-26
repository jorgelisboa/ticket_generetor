function pegarCodBilheteUrl() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("cod"); //pega o value

    return data
}

let cod = pegarCodBilheteUrl()

//colocar cod no texto do html
let ticketCode = document.getElementById("ticketCodigo")

ticketCode.textContent = cod;
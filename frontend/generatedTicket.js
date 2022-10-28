var url_string = window.location.href;
var url = new URL(url_string);
var cod = url.searchParams.get("cod"); //pega o value
var date = url.searchParams.get("date"); //pega o value


//colocar cod no texto do html
let ticketCode = document.getElementById("ticketCodigo")
let ticketDate = document.getElementById("ticketDate")

ticketCode.textContent = `ID: ${cod}`;
ticketDate.textContent = `Data de geração: ${date}`;
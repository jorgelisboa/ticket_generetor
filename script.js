const express = require("express"); // incluindo bibliotecas
const res = require("express/lib/response");
const app = express(); // criando variavel do express
const port = 3000; // a porta do meu computador que o site vai rodar
let fs = require("fs");

app.get("/", (req, res) => {
  // quando voce acessa a pagina principal get voce pega essa pagina. getpegar
  res.sendFile(
    "C:\\Users\\jonat\\OneDrive\\Área de Trabalho\\S.I\\ticket_generetor\\index.html"
  );

  
});
app.get("/gerar_bilhete", (req, res) => {
  res.send("Gerar Bilhete");
});

app.get("/bilhete_gerado", (req, res) => {
  res.send("Bilhete Gerado");
});

app.get("/recarregar_bilhete", (req, res) => {
  res.send("Recarregar Bilhete");
});

app.get("/relatorio_bilhete", (req, res) => {
  res.send("Relatorio Bilhete");
});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});

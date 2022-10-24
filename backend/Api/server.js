const app = require("./app");

// Estabelece variáveis de ambiente durante a execução do servidor.
// Verificar o .env.example e gerar o arquivo .env, com a porta e dados do banco de dados (se estiver na PUC, a senha que utiliza durante as aulas práticas).
require("dotenv").config();

const PORT = process.env.PORT ? process.env.PORT : 5000;

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}.`));

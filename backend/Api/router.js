const express = require("express");
const ticketController = require("./controllers/ticket.controller");
const terminalController = require("./controllers/terminal.controller");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();

// Configurações dos endpoints.
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/api/bilhetes", ticketController.gerarBilhete);
router.post("/api/recargas", ticketController.recarregarBilhete);
router.get("/api/recargas/:codigo_bilhete", ticketController.historicoBilhete);
router.post("/api/terminal", terminalController.utilizacaoBilhete);

module.exports = router;

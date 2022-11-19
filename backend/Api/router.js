const express = require("express");
const ticketController = require("./controllers/ticket.controller");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();

// Configurações dos endpoints.
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/api/bilhetes", ticketController.gerarBilhete);
router.post("/api/recargas", ticketController.recarregarBilhete);

module.exports = router;

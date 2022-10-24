const express = require("express");
const ticketController = require("./controllers/ticket.controller");

const router = express.Router();

router.get("/api/bilhetes", ticketController.recuperarBilhetes);

module.exports = router;

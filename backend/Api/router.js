const express = require("express");
const ticketController = require("./controllers/ticket.controller");
const cors = require("cors");

const router = express.Router();

router.use(cors())

router.get("/api/bilhetes", ticketController.recuperarBilhetes);

module.exports = router;

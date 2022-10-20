const express = require("express");
const ticketController = require("./controllers/ticket.controller");

const router = express.Router();

router.get("/api/tickets", ticketController.getTickets);

module.exports = router;

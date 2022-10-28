const express = require("express");
const ticketController = require("./controllers/ticket.controller");
const cors = require("cors");

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

const router = express.Router();

router.get("/api/bilhetes", cors(corsOpts), ticketController.recuperarBilhetes);

module.exports = router;

const ticketController = require("../models/ticket.model");

const recuperarBilhetes = async (req, res) => {
  return res.status(200).json(await ticketController.recuperarBilhetes());
};

module.exports = {
  recuperarBilhetes,
};

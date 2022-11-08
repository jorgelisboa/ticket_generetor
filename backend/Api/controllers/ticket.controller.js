const ticketController = require("../models/ticket.model");

const recuperarBilhetes = async (req, res) => {
  return res.status(201).json(await ticketController.recuperarBilhetes());
};

const recarregarBilhete = async (req, res) => {
  return res.status(200).json(await ticketController.recarregarBilhete(req.body));
}

module.exports = {
  recuperarBilhetes,
  recarregarBilhete
};
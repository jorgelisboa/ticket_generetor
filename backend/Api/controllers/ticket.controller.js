const ticketController = require("../models/ticket.model");

const recuperarTickets = async (req, res) => {
  return res.status(200).json(await ticketController.recuperarTickets());
};

module.exports = {
  recuperarTickets,
};

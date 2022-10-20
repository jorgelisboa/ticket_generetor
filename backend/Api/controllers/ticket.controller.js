const ticketController = require("../models/ticket.model");

const getTickets = async (req, res) => {
  return res.status(200).json(await ticketController.getTickets());
};

module.exports = {
  getTickets,
};

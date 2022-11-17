const ticketController = require("../models/ticket.model");

const recuperarBilhetes = async (req, res) => {
  const bilhete = await ticketController.recuperarBilhetes()
  if (bilhete == 0) res.status(400).json({msg: "Erro ao gerar bilhete.", status: 400})
  else return res.status(200).json(bilhete);
};

const recarregarBilhete = async (req, res) => {
  const recarga = await ticketController.recarregarBilhete(req.body)
  if (recarga == 1) return res.status(200).json({msg: "Bilhete recarregado com sucesso.", status: 200})
  else res.status(400).json({msg: "Erro ao recarregar bilhete.", status: 400})
}

module.exports = {
  recuperarBilhetes,
  recarregarBilhete
};
const ticketController = require("../models/ticket.model");

const gerarBilhete = async (req, res) => {
  const bilhete = await ticketController.gerarBilhete();
  if (bilhete == 0)
    res.status(400).json({ msg: "Erro ao gerar bilhete.", status: 400 });
  else return res.status(200).json(bilhete);
};

const recarregarBilhete = async (req, res) => {
  const recarga = await ticketController.recarregarBilhete(req.body);
  if (recarga == 0)
    res.status(400).json({ msg: "Erro ao recarregar bilhete.", status: 400 });
  else
    return res.status(200).json({
      msg: `Seu ${recarga.DESCRICAO} foi recarregado com sucesso.`,
      status: 200,
    });
};

module.exports = {
  gerarBilhete,
  recarregarBilhete,
};

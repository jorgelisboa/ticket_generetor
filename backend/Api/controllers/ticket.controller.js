const ticketModel = require("../models/ticket.model");

const gerarBilhete = async (req, res) => {
  const bilhete = await ticketModel.gerarBilhete();
  if (bilhete == 0)
    return res.status(400).json({ msg: "Erro ao gerar bilhete.", status: 400 });
  else return res.status(200).json(bilhete);
};

const recarregarBilhete = async (req, res) => {
  const recarga = await ticketModel.recarregarBilhete(req.body);
  if (recarga == 0)
    return res
      .status(400)
      .json({ msg: "Erro ao recarregar bilhete.", status: 400 });
  else
    return res.status(200).json({
      msg: `Seu ${recarga.DESCRICAO} foi recarregado com sucesso.`,
      status: 200,
    });
};

const historicoBilhete = async (req, res) => {
  const historico = await ticketModel.historicoBilhete(
    req.params.codigo_bilhete
  );

  if (historico != 0) return res.status(200).json(historico);
  else
    return res.status(400).json({
      msg: `Não foi possível obter o histórico do bilhete.`,
      status: 400,
    });
};

module.exports = {
  gerarBilhete,
  recarregarBilhete,
  historicoBilhete,
};

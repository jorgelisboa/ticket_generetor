const terminalModel = require("../models/terminal.model");

const utilizacaoBilhete = async (req, res) => {
  const bilhete = await terminalModel.utilizacaoBilhete(req.body);
  if (bilhete == 0)
    return res.status(400).json({
      msg: "Não foi possível a utilização do bilhete, tente novamente.",
      status: 400,
    });
  else if (bilhete == 1)
    return res.status(200).json({
      msg: `Bilhete expirado.`,
      status: 200,
    });
  else return res.status(200).json({ msg: bilhete, status: 200 });
};

module.exports = {
  utilizacaoBilhete,
};

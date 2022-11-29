const terminalModel = require("../models/terminal.model");

const utilizacaoBilhete = async (req, res) => {
  const bilhete = await terminalModel.utilizacaoBilhete(req.body);
  if (bilhete != 0) return res.status(200).json({ msg: bilhete, status: 200 });
  else
    return res.status(400).json({
      msg: `Não foi possível a utilização do seu bilhete, tente novamente.`,
      status: 400,
    });
};

module.exports = {
  utilizacaoBilhete,
};

const oracledb = require("oracledb");
const _utilsService = require("../services/utils.service");
const dbConfig = require("../services/connection.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

const utilizacaoBilhete = async (req) => {
  let connection;
  // connection = await oracledb.getConnection(dbConfig);
  connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
  });

  try {
    const bilhete = await connection.execute(
      `SELECT id FROM bilhetes WHERE numero = :bilhete`,
      [req.codigo_bilhete]
    );

    let dataExpiracao = await connection.execute(
      `SELECT data_primeiro_uso, data_expiracao, id_tipo FROM recargas WHERE id_bilhete = :bilhete AND data_expiracao > sysdate AND bilhete_status = 'N' ORDER BY data_expiracao FETCH FIRST 1 ROW ONLY`,
      [bilhete.rows[0].ID]
    );

    let expiracao = 0;

    if (dataExpiracao.rows.length == 0) {
      await connection.execute(
        `UPDATE recargas
    SET data_primeiro_uso = sysdate, data_ultimo_uso = sysdate, bilhete_status = 'U', data_expiracao =
    (CASE
    WHEN id_tipo = 1 THEN sysdate + interval '40' minute
    WHEN id_tipo = 2 THEN sysdate + interval '40' minute
    WHEN id_tipo = 3 THEN sysdate + 7
    WHEN id_tipo = 4 THEN sysdate + 30
    END)
    WHERE ROWID IN
    (
    SELECT ROWID FROM (
    SELECT data_primeiro_uso
    FROM recargas
    WHERE data_primeiro_uso IS NULL AND id_bilhete = :bilhete
    ORDER BY data_recarga
    )
    WHERE ROWNUM = 1
    )`,
        [bilhete.rows[0].ID]
      );
      expiracao = _utilsService.timerExpiracao(
        new Date(),
        dataExpiracao.rows[0].DATA_EXPIRACAO
      );
    } else {
      console.log('update data de uso')
      await connection.execute(
        `UPDATE recargas
    SET data_ultimo_uso = sysdate
    WHERE ROWID IN
    (
    SELECT ROWID FROM (
    SELECT data_primeiro_uso
    FROM recargas
    WHERE data_primeiro_uso IS NULL AND id_bilhete = :bilhete
    ORDER BY data_recarga
    )
    WHERE ROWNUM = 1
    )`,
        [bilhete.rows[0].ID]
      );
      expiracao = _utilsService.timerExpiracao(
        dataExpiracao.rows[0].DATA_ULTIMO_USO,
        dataExpiracao.rows[0].DATA_EXPIRACAO
      );
    }

    return expiracao;
  } catch (err) {
    return 0;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = {
  utilizacaoBilhete,
};

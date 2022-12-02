const oracledb = require("oracledb");
const _utilsService = require("../services/utils.service");
const dbConfig = require("../services/connection.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

const utilizacaoBilhete = async (req) => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);
  // connection = await oracledb.getConnection({
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
  // });

  try {
    const dataAgora = new Date();
    const dataUTC = new Date(dataAgora.getTime() + 3 * 60 * 60 * 1000);
    const bilhete_40 = new Date(dataAgora.getTime() + 40 * 60 * 1000);
    const bilhete_7 = new Date(dataAgora.getTime() + 7 * 24 * 60 * 60 * 1000);
    const bilhete_30 = new Date(dataAgora.getTime() + 30 * 24 * 60 * 60 * 1000);

    const bilhete = await connection.execute(
      `SELECT id FROM bilhetes WHERE numero = :bilhete`,
      [req.codigo_bilhete]
    );

    let bilheteUpdate = await connection.execute(
      `SELECT data_primeiro_uso, data_expiracao, data_ultimo_uso, id_tipo, bilhete_status FROM recargas WHERE id_bilhete = :bilhete AND bilhete_status = 'U' ORDER BY data_expiracao FETCH FIRST 1 ROW ONLY`,
      [bilhete.rows[0].ID]
    );
    let bilheteNovo = false;

    if (bilheteUpdate.rows.length == 0) {
      bilheteUpdate = await connection.execute(
        `SELECT data_primeiro_uso, data_expiracao, id_tipo FROM recargas WHERE id_bilhete = :bilhete AND bilhete_status = 'N' ORDER BY data_expiracao FETCH FIRST 1 ROW ONLY`,
        [bilhete.rows[0].ID]
      );
      bilheteNovo = true;
    } else if (
      bilhete.rows[0].ID_TIPO == 2 &&
      bilhete.rows[0].DATA_ULTIMO_USO > bilhete.rows[0].DATA_EXPIRACAO
    )
      bilheteUpdate = await connection.execute(
        `SELECT data_primeiro_uso, data_expiracao, data_ultimo_uso, id_tipo, bilhete_status FROM recargas WHERE id_bilhete = :bilhete AND bilhete_status = 'U2' ORDER BY data_expiracao FETCH FIRST 1 ROW ONLY`,
        [bilhete.rows[0].ID]
      );

    if (bilheteNovo) {
      await connection.execute(
        `UPDATE recargas
        SET data_primeiro_uso = sysdate, data_ultimo_uso = sysdate, bilhete_status = 'U', 
        data_expiracao =
        (CASE
        WHEN id_tipo = 1 THEN sysdate + interval '40' minute
        WHEN id_tipo = 2 THEN sysdate + interval '40' minute
        WHEN id_tipo = 3 THEN sysdate + 7
        WHEN id_tipo = 4 THEN sysdate + 30
        END)
        WHERE ROWID IN
        (
        SELECT ROWID FROM (
        SELECT data_primeiro_uso, id_tipo
        FROM recargas
        WHERE data_primeiro_uso IS NULL AND id_bilhete = :bilhete
        ORDER BY data_recarga
        )
        WHERE ROWNUM =  1
        )`,
        [bilhete.rows[0].ID]
      );

      let bilheteNovo = await connection.execute(
        `SELECT * FROM recargas WHERE id_bilhete = :bilhete AND bilhete_status = 'U'`,
        [bilhete.rows[0].ID]
      );

      switch (bilheteNovo.rows[0].ID_TIPO) {
        case 1:
        case 2:
          return _utilsService.timerExpiracao(dataAgora, bilhete_40);
        case 3:
          return _utilsService.timerExpiracao(dataAgora, bilhete_7);
        case 4:
          return _utilsService.timerExpiracao(dataAgora, bilhete_30);
      }
    } else {
      if (
        bilheteUpdate.rows[0].ID_TIPO == 2 &&
        dataUTC.getTime() >
          new Date(bilheteUpdate.rows[0].DATA_EXPIRACAO).getTime() &&
        bilheteUpdate.rows[0].BILHETE_STATUS == "U2"
      ) {
        await connection.execute(
          `UPDATE recargas
          SET bilhete_status = 'E'
          WHERE id_bilhete = :bilhete AND bilhete_status = 'U2'`,
          [bilhete.rows[0].ID]
        );
        return 1;
      } else if (
        bilheteUpdate.rows[0].ID_TIPO == 2 &&
        dataUTC.getTime() >
          new Date(bilheteUpdate.rows[0].DATA_EXPIRACAO).getTime()
      ) {
        await connection.execute(
          `UPDATE recargas
          SET bilhete_status = 'U2', data_ultimo_uso = sysdate, data_expiracao = WHEN id_tipo = 2 THEN sysdate + interval '40' minute
          WHERE id_bilhete = :bilhete AND bilhete_status = 'U'`,
          [bilhete.rows[0].ID]
        );

        return _utilsService.timerExpiracao(
          dataUTC,
          bilheteUpdate.rows[0].DATA_EXPIRACAO
        );
      } else if (
        dataUTC.getTime() >
        new Date(bilheteUpdate.rows[0].DATA_EXPIRACAO).getTime()
      ) {
        await connection.execute(
          `UPDATE recargas
          SET bilhete_status = 'E'
          WHERE id_bilhete = :bilhete AND bilhete_status = 'U'`,
          [bilhete.rows[0].ID]
        );
        return 1;
      }

      await connection.execute(
        `UPDATE recargas
          SET data_ultimo_uso = sysdate, bilhete_status = 'U'
          WHERE id_bilhete = :bilhete AND bilhete_status = 'U'`,
        [bilhete.rows[0].ID]
      );

      return _utilsService.timerExpiracao(
        dataUTC,
        bilheteUpdate.rows[0].DATA_EXPIRACAO
      );
    }
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

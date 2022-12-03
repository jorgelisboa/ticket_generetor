const oracledb = require("oracledb");
const dbConfig = require("../services/connection.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

oracledb.initOracleClient({
  libDir: "C:\\instantclient_21_7",
});

// Geração de bilhete único.
const gerarBilhete = async () => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);
  // connection = await oracledb.getConnection({
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
  // });

  let randomCode = new Date().getTime();

  try {
    await connection.execute(
      `INSERT INTO bilhetes (id, numero) VALUES (seq_codigo_bilhetes.nextval, :bilhete)`,
      [randomCode]
    );

    const bilhete = await connection.execute(
      `SELECT numero, data_geracao FROM bilhetes WHERE numero = :bilhete`,
      [randomCode]
    );

    return bilhete.rows[0];
  } catch (err) {
    console.log(err);
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

// Recarga de bilhete pelo número.
const recarregarBilhete = async (req) => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);
  // connection = await oracledb.getConnection({
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
  // });

  try {
    const bilhete = await connection.execute(
      `SELECT id FROM bilhetes WHERE numero = :bilhete`,
      [req.codigo_bilhete]
    );

    const recarga = await connection.execute(
      `SELECT descricao FROM tipos_recargas WHERE id = :id`,
      [req.tipo]
    );

    await connection.execute(
      `INSERT INTO recargas (id_bilhete, id_tipo) VALUES (:id, :tipo)`,
      [bilhete.rows[0].ID, req.tipo]
    );

    return recarga.rows[0];
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

const historicoBilhete = async (bilhete) => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);
  // connection = await oracledb.getConnection({
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
  // });

  try {
    const idBilhete = await connection.execute(
      `SELECT id FROM bilhetes WHERE numero = :bilhete`,
      [bilhete]
    );

    const historico = await connection.execute(
      `SELECT r.data_recarga, r.data_expiracao, r.data_primeiro_uso, t.descricao tipo FROM recargas r
        INNER JOIN tipos_recargas t ON t.id = r.id_tipo
        WHERE r.id_bilhete = :bilhete ORDER BY data_recarga DESC`,
      [idBilhete.rows[0].ID]
    );

    return historico.rows;
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
  gerarBilhete,
  recarregarBilhete,
  historicoBilhete,
};

const oracledb = require("oracledb");
const dbConfig = require("./connection.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

oracledb.initOracleClient({
  libDir: "C:\\instantclient_21_7",
});

const gerarBilhete = async () => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);

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
    console.log(err)
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

const recarregarBilhete = async (req) => {
  let connection;
  connection = await oracledb.getConnection(dbConfig);

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

module.exports = {
  gerarBilhete,
  recarregarBilhete
};
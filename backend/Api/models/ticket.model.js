const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

const recuperarBilhetes = async () => {
  let connection;
  connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe", 
  });

  let randomCode = new Date().getTime();
  let result;

   try {
    //connection = await oracledb.getConnection(dbConfig); TODO: Verificar funcionamendo com arquivo externo.
    await connection.execute(`INSERT INTO bilhetes (codigo, numero) VALUES (seq_codigo_bilhetes.nextval, :bilhete)`, [randomCode]);

    const bilhete = await connection.execute(`SELECT numero, data_geracao FROM bilhetes WHERE numero = :bilhete`, [randomCode]);

    return bilhete.rows[0];

   } catch (err) {
     console.log(err);
   } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
  recuperarBilhetes,
};

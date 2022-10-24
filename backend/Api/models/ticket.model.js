const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const recuperarBilhetes = async () => {
  let connection;
   try {
    // connection = await oracledb.getConnection(dbConfig); TODO: Verificar funcionamendo com arquivo externo.

    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe", 
    });

    const tickets = await connection.execute(`SELECT * FROM BILHETES`);
    return tickets.rows;
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

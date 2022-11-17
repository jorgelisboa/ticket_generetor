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

   try {
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

const recarregarBilhete = async (req) => {
  let connection;
  connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe", 
  });
 try {

  const bilhete = await connection.execute(`SELECT id FROM bilhetes WHERE numero = :bilhete`, [req.codigo_bilhete]);

  const recarga = await connection.execute(`INSERT INTO recargas (id_bilhete, id_tipo) VALUES (:id, :tipo)`, [bilhete.rows[0].ID, req.tipo]);

  return 1;

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
}

module.exports = {
  recuperarBilhetes,
  recarregarBilhete
};

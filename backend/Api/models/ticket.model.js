const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;

oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_7' });

const recuperarBilhetes = async () => {
  let connection;
  connection = await oracledb.getConnection({
    user: 'admin',
    password: 'TicketGen2022',
    connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=g6f8bc328ff6f14_ticketgenerate_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.sa-saopaulo-1.oraclecloud.com, OU=Oracle ADB SAOPAULO, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))`, 
  });

  let randomCode = new Date().getTime();

   try {
    await connection.execute(`INSERT INTO bilhetes (id, numero) VALUES (seq_codigo_bilhetes.nextval, :bilhete)`, [randomCode]);

    const bilhete = await connection.execute(`SELECT numero, data_geracao FROM bilhetes WHERE numero = :bilhete`, [randomCode]);

    return bilhete.rows[0];

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

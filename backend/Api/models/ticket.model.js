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

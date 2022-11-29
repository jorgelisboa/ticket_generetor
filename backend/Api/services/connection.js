module.exports = {
  user: "admin",
  password: "TicketGen2022",
  connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=g6f8bc328ff6f14_ticketgenerate_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.sa-saopaulo-1.oraclecloud.com, OU=Oracle ADB SAOPAULO, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))`,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // connectString: process.env.DB_CONNECTIONSTRING || "CEATUDB02:1521/xe",
};

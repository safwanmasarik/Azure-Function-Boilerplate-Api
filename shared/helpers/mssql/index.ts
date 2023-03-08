import sql from "mssql/msnodesqlv8";

export function initialiseConnection() {

    const config = {
        user: process.env["SQLUsername"],
        password: process.env["SQLPassword"],
        server: process.env["SQLServer"],
        database: process.env["SQLDatabase"],
        options: {
            encrypt: false, // for azure set to true
            trustedConnection: true, // Use Windows authentication (local)
            trustServerCertificate: false // change to true for local dev / self-signed certs
        },
        beforeConnect: function (bcConfig) {
            // Modify the connection options here
            /** The Driver SQL Server Native Client has been removed from SQL Server 2022. 
             *  Source https://learn.microsoft.com/en-us/sql/relational-databases/native-client/applications/installing-sql-server-native-client?view=sql-server-ver16  
             *  ODBC Driver 17 for SQL Server is tested working well with SQL Server 2019 & 2022 */
            bcConfig.conn_str = bcConfig.conn_str.replace("SQL Server Native Client 11.0", "ODBC Driver 17 for SQL Server");
        }
    };

    let pool = new sql.ConnectionPool(config);
    return pool;
}

export { sql };
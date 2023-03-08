import sql from "mssql/msnodesqlv8";

export function initialiseConnection() {
    let connectionString = process.env["SQLConnectionString"];

    const config = {
        driver: "SQL Server",
        user: process.env["SQLUsername"],
        password: process.env["SQLPassword"],
        server: process.env["SQLServer"],
        database: process.env["SQLDatabase"],
        options: {
            encrypt: false, // for azure set to true
            trustedConnection: true, // Use Windows authentication
            trustServerCertificate: false // change to true for local dev / self-signed certs
        }
    };

    return new sql.ConnectionPool(config)
}

export { sql };
import sql from "mssql/msnodesqlv8";

export function initialiseConnection() {
    let config = process.env["SQLConnectionString"];
    return new sql.ConnectionPool(config)
}

export { sql };
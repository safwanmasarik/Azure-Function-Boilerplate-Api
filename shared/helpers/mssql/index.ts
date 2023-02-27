import sql from "mssql"

export default function initialiseConnection() {
    let config = process.env["SQLConnectionString"];
    return new sql.ConnectionPool(config)
}
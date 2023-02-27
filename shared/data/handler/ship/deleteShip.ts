import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryDeleteShip } from "../../sql/ship/queryDeleteShip";
import { ReqCreateUpdateDeleteShip } from "../../../models/ship/ReqCreateUpdateDeleteShip";

export async function deleteShip({ ship_code }: ReqCreateUpdateDeleteShip): Promise<{ ship_code: string }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let shipCode: string = ship_code;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {

            // Perform deletion of ship contract
            let query = queryDeleteShip;
            let queryRequest = await transaction.request();
            queryRequest.input('ship_code', sql.NVarChar, shipCode);
            let queryResult = await queryRequest.query(query);

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        } finally {
            pool.close();
        }

        return {
            ship_code: shipCode
        };

    } catch (error) {
        throw new Error(error.message);
    }
};
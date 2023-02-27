import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryUpdateShip } from "../../sql/ship/queryUpdateShip";
import { ReqCreateUpdateDeleteShip } from "../../../models/ship/ReqCreateUpdateDeleteShip";

export async function updateShip({ ship_id, ship_code, ship_name, updated_by }: ReqCreateUpdateDeleteShip): Promise<{ ship_id: number }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let shipId: number = ship_id;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {
            let queryRequest;
            let query;
            let queryResult;

            // Perform update of ship contract
            query = queryUpdateShip;
            queryRequest = await transaction.request();
            queryRequest.input('ship_id', sql.NVarChar, ship_id);
            queryRequest.input('ship_name', sql.NVarChar, ship_name);
            queryRequest.input('ship_code', sql.NVarChar, ship_code);
            queryRequest.input('updated_by', sql.NVarChar, updated_by);
            queryResult = await queryRequest.query(query);

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        } finally {
            pool.close();
        }

        return {
            ship_id: shipId
        };

    } catch (error) {
        throw new Error(error.message);
    }
};
import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryCreateShip } from "../../sql/ship/queryCreateShip";
import { ReqCreateUpdateDeleteShip } from "../../../models/ship/ReqCreateUpdateDeleteShip";

export async function createShip({ ship_code, ship_name, updated_by }: ReqCreateUpdateDeleteShip): Promise<{ ship_id: number }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let shipId: number = null;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {
            let queryRequest;
            let query;
            let queryResult;
            let jsonObject: any;

            // Perform creation of ship
            query = queryCreateShip;
            queryRequest = await transaction.request();
            queryRequest.input('ship_code', sql.NVarChar, ship_code);
            queryRequest.input('ship_name', sql.NVarChar, ship_name);
            queryRequest.input('updated_by', sql.NVarChar, updated_by);

            queryResult = await queryRequest.query(query);
            jsonObject = queryResult.recordsets[0][0];

            if (jsonObject) {
                shipId = jsonObject[0].ship_id;
            };

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
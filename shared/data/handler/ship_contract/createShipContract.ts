import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryCreateShipContract } from "../../sql/ship_contract/queryCreateShipContract";
import { Helper } from "../../../helpers/helper/helper";
import { ReqCreateUpdateDeleteShipContract } from "../../../models/ship_contract/ReqCreateUpdateDeleteShipContract";

export async function createShipContract(params: ReqCreateUpdateDeleteShipContract): Promise<{ contract_id: string }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let contractId: string = null;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {
            let queryRequest;
            let query;
            let queryResult;
            let jsonObject: any;

            // Perform creation of ship contract
            query = queryCreateShipContract;
            queryRequest = await transaction.request();
            queryRequest.input('ship_code', sql.NVarChar, params.ship_code);
            queryRequest.input('ship_purpose_code', sql.Int, params.ship_purpose_code);
            queryRequest.input('contract_start_date', sql.NVarChar, Helper.ConvertSQLDate(params.contract_start, false));
            queryRequest.input('contract_end_date', sql.NVarChar, Helper.ConvertSQLDate(params.contract_end, false));
            queryRequest.input('updated_by', sql.NVarChar, params.updated_by);

            queryResult = await queryRequest.query(query);
            jsonObject = queryResult.recordsets[0][0];

            if (jsonObject) {
                contractId = jsonObject[0].contract_id;
            }

            // Perform any additional queries

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        } finally {
            pool.close();
        }

        return {
            contract_id: contractId
        };

    } catch (error) {
        throw new Error(error.message);
    }
};
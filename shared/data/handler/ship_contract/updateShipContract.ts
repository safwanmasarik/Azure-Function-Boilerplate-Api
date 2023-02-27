import initialiseConnection from "../../../helpers/mssql";
import sql from "mssql";
import { queryUpdateShipContract } from "../../sql/ship_contract/queryUpdateShipContract";
import { Helper } from "../../../helpers/helper/helper";
import { ReqCreateUpdateDeleteShipContract } from "../../../models/ship_contract/ReqCreateUpdateDeleteShipContract";

export async function updateShipContract(params: ReqCreateUpdateDeleteShipContract): Promise<{ contract_id: string }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let contractId: string = params.ship_contract_id;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {
            let queryRequest;
            let query;
            let queryResult;

            // Perform update of ship contract
            query = queryUpdateShipContract;
            queryRequest = await transaction.request();
            queryRequest.input('ship_code', sql.NVarChar, params.ship_code);
            queryRequest.input('ship_purpose_code', sql.NVarChar, params.ship_purpose_code);
            queryRequest.input('contract_start_date', sql.NVarChar, Helper.ConvertSQLDate(params.contract_start, false));
            queryRequest.input('contract_end_date', sql.NVarChar, Helper.ConvertSQLDate(params.contract_end, false));
            queryRequest.input('updated_by', sql.NVarChar, params.updated_by);
            queryResult = await queryRequest.query(query);

            // Perform any additional queries. Example below.
            // query = queryExample;
            // queryRequest = await transaction.request();
            // queryRequest.input('example_input', sql.NVarChar, exampleInput);
            // queryResult = await queryRequest.query(query);

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
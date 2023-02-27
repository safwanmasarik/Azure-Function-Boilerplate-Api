import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryDeleteShipContract } from "../../sql/ship_contract/queryDeleteShipContract";

export async function deleteShipContract(contract_id: string): Promise<{ contract_id: string }> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        // Begin transaction
        let contractId: string = contract_id;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();
        try {
            let queryRequest;
            let query;
            let queryResult;

            // Perform deletion of ship contract
            query = queryDeleteShipContract;
            queryRequest = await transaction.request();
            queryRequest.input('ship_contract_id', sql.NVarChar, contractId);
            queryResult = await queryRequest.query(query);

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
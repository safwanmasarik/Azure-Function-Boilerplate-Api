import { initialiseConnection, sql } from "../../../helpers/mssql";
import { ReqGetShipContract } from "../../../models/ship_contract/ReqGetShipContract";
import { queryGetShipContracts } from "../../sql/ship_contract/queryGetShipContracts";


export async function getShipContract({ ship_name, ship_code, ship_contract_id, ship_purpose_code }: ReqGetShipContract): Promise<object[]> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        let query = queryGetShipContracts;
        let queryRequest = await pool.request();

        let whereClause = "";

        if (ship_name) {
            whereClause += ` AND s.name = @ship_name`;
            queryRequest.input('ship_name', sql.NVarChar, ship_name);
        }

        if (ship_code) {
            whereClause += ` AND sc.ship_code = @ship_code`;
            queryRequest.input('ship_code', sql.NVarChar, ship_code);
        }

        if (ship_contract_id) {
            whereClause += ` AND sc.id = @ship_contract_id`;
            queryRequest.input('ship_contract_id', sql.NVarChar, ship_contract_id);
        }

        if (ship_purpose_code) {
            whereClause += ` AND sc.ship_purpose_code = @ship_purpose_code`;
            queryRequest.input('ship_purpose_code', sql.NVarChar, ship_purpose_code);
        }

        query = query.replace("@replace", whereClause);

        let queryResult = await queryRequest.query(query);

        const jsonObject: object[] = queryResult.recordsets[0][0];

        pool.close();

        if (jsonObject == null) return [];
        return jsonObject;

    } catch (error) {
        throw new Error(error.message);
    }
};
import { initialiseConnection, sql } from "../../../helpers/mssql";
import { queryGetShip } from "../../sql/ship/queryGetShip";
import { ReqGetShip } from "../../../models/ship/ReqGetShip";

export async function getShip({ ship_code, ship_name }: ReqGetShip): Promise<object[]> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        let query = queryGetShip;
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
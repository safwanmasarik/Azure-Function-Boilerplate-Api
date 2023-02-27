import initialiseConnection from "../../../helpers/mssql";
import { queryGetUser } from "../../sql/access_control/queryGetUser";
import sql from "mssql";

export async function getUser(display_name: string): Promise<object> {
    try {

        let pool = initialiseConnection();
        await pool.connect();
        pool.config.parseJSON = true;

        let query = queryGetUser;
        let queryRequest = await pool.request();
        queryRequest.input('display_name', sql.NVarChar, display_name);

        let queryResult = await queryRequest.query(query);

        const jsonObject: object[] = queryResult.recordsets[0][0];

        pool.close();

        if (jsonObject == null) return null;
        return jsonObject;

    } catch (error) {
        throw new Error(error.message);
    }
};
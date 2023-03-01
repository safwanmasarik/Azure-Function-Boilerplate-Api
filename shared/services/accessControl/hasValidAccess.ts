import { HttpRequest } from "@azure/functions";
import { ValidAccess } from "../../models/accessControl/ValidAccess";
import * as data from '../../data/handler/accessControl/getUser';
import { JsonConvert } from "json2typescript";
import { DbUser } from "../../models/accessControl/DbUser";
import mock_data_getUser from "../../../az_http_ship/__tests__/mock_data_getUser";

let jsonConvert: JsonConvert = new JsonConvert();

export async function hasValidAccess(req: HttpRequest): Promise<ValidAccess> {
    try {
        /** In real implementation, we'll read and pass the request Authorization header,
         *  to the user access control api (different microservice azure function). 
         *  The response will contain user permission and features.
         *  For the boilerplate we'll mock all user request as coming from Super Admin. 
         */

        /** Mocking db response.
        *   When actual database connection is available,
        *   then remove this mocking condition and "MockDbResponse" config.
        */
        let queryData: object;
        if (process.env["MockDbResponse"] == "yes") {
            queryData = mock_data_getUser
        } else {
            queryData = await data.getUser("Super Admin");
        };

        let modelledDbData = jsonConvert.deserializeObject(queryData, DbUser);
        let userHasValidAccess = true;

        return {
            is_valid: userHasValidAccess,
            loggedin_userid: modelledDbData.user_id
        }

    } catch (error) {
        return {
            is_valid: false,
            loggedin_userid: null
        }
    }
}
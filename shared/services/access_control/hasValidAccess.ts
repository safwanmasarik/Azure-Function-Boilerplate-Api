import { HttpRequest } from "@azure/functions";
import { ValidAccess } from "../../models/access_control/ValidAccess";
import * as data from '../../data/handler/access_control/getUser';
import { JsonConvert } from "json2typescript";
import { DbUser } from "../../models/access_control/DbUser";

let jsonConvert: JsonConvert = new JsonConvert();

export async function hasValidAccess(req: HttpRequest): Promise<ValidAccess> {
    try {
        /** In real implementation, we'll read and pass the request Authorization header,
         *  to the user access control api (different microservice azure function). 
         *  The response will contain user permission and features.
         *  For the boilerplate we'll mock all user request as coming from Super Admin. 
         */
        const queryData = await data.getUser("Super Admin");
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
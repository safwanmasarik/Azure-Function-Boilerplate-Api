import data from '../../data/handler/ship';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { hasValidAccess } from '../accessControl/hasValidAccess';
import { ReqCreateUpdateDeleteShip } from '../../models/ship/ReqCreateUpdateDeleteShip';

class Response extends ResponseBase {

}

export async function deleteShip(req: HttpRequest): Promise<Response> {
  try {

    const userAccess = await hasValidAccess(req);

    if (!userAccess.is_valid) {
      return {
        is_valid: false,
        message: "Access denied, you don't have sufficient permission."
      }
    }

    // For delete get the request query parameter
    const params = new ReqCreateUpdateDeleteShip();
    params.ship_code = req?.query?.ship_code ?? null;
    params.is_permanent_delete = req?.query?.is_permanent_delete == "true" ? true : false;

    // Validate request query parameter
    if (!params.ship_code) {
      return {
        is_valid: false,
        message: "Ship code is required."
      };
    }

    // Perform action

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let shipCode: string;
    if (process.env["MockDbResponse"] == "yes") {
      shipCode = "armada-naga";
    } else {
      shipCode = (await data.deleteShip(params)).ship_code;
    };

    if (shipCode) {
      return {
        is_valid: true,
        message: `Ship is successfully deleted ${params.is_permanent_delete ? "permanently" : "softly"}. Ref ship code: ${shipCode}.`
      }
    }

    return {
      is_valid: false,
      message: `Ship deletion failed due to unknown reason.`
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: `Ship deletion failed. Error message: ${error.message}.`
    }
  }
}
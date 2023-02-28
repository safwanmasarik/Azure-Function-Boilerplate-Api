import data from '../../data/handler/ship';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqCreateUpdateDeleteShip } from '../../models/ship/ReqCreateUpdateDeleteShip';
import * as jf from 'joiful';
import { hasValidAccess } from '../accessControl/hasValidAccess';

class Response extends ResponseBase {
  data: { ship_id: number } = {
    ship_id: null
  }
}

export async function createShip(req: HttpRequest): Promise<Response> {
  try {

    // Check if user has permission to perform action
    const userAccess = await hasValidAccess(req);

    if (!userAccess.is_valid) {
      return {
        is_valid: false,
        message: "Access denied, you don't have sufficient permission.",
        data: null
      }
    }

    // Get the request body
    const params = new ReqCreateUpdateDeleteShip();
    params.updated_by = userAccess.loggedin_userid;
    params.ship_name = req?.body?.ship_name ?? null;
    params.ship_code = req?.body?.ship_code ?? null;

    // Validate request body
    const joiValidation = jf.validate(params);

    if (joiValidation.error) {
      return {
        is_valid: false,
        message: joiValidation.error.message,
        data: null
      };
    }

    // Perform action

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let shipId: number;
    if (process.env["MockDbResponse"] == "yes") {
      shipId = 25;
    } else {
      shipId = (await data.createShip(params)).ship_id;
    };

    if (shipId) {
      return {
        is_valid: true,
        message: `Ship is successfully created. Ref ship id: ${shipId}.`,
        data: {
          ship_id: shipId
        }
      }
    }

    return {
      is_valid: false,
      message: `Ship creation failed due to unknown reason.`,
      data: null
    }

  }
  catch (error) {
    return {
      is_valid: false,
      message: `Ship creation failed. Error message: ${error.message}.`,
      data: null
    }
  }

}
import data from '../../data/handler/ship';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqCreateUpdateDeleteShip } from '../../models/ship/ReqCreateUpdateDeleteShip';
import * as jf from 'joiful';
import { hasValidAccess } from '../access_control/hasValidAccess';

class Response extends ResponseBase {

}

export async function updateShip(req: HttpRequest): Promise<Response> {
  try {

    // Check if user has permission to perform action
    const userAccess = await hasValidAccess(req);

    if (!userAccess.is_valid) {
      return {
        is_valid: false,
        message: "Access denied, you don't have sufficient permission."
      }
    }

    // Get the request body
    const params = new ReqCreateUpdateDeleteShip();
    params.updated_by = userAccess.loggedin_userid;
    params.ship_id = req?.body?.ship_id ?? null;
    params.ship_name = req?.body?.ship_name ?? null;
    params.ship_code = req?.body?.ship_code ?? null;

    // Validate request body
    const joiValidation = jf.validate(params);

    if (joiValidation.error) {
      return {
        is_valid: false,
        message: joiValidation.error.message
      };
    }

    // Perform action
    if (params.ship_id == null) {
      return {
        is_valid: false,
        message: `Ship id is required.`
      }
    };

    let shipId = (await data.updateShip(params)).ship_id;

    if (shipId) {
      return {
        is_valid: true,
        message: `Ship is successfully updated. Ref ship id: ${shipId}.`
      }
    }

    return {
      is_valid: false,
      message: `Ship update failed due to unknown reason.`
    }

  }
  catch (error) {
    return {
      is_valid: false,
      message: `Ship update failed. Error message: ${error.message}.`
    }
  }

}
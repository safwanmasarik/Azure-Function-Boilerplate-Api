import data from '../../data/handler/shipContract';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqCreateUpdateDeleteShipContract } from "../../models/shipContract/ReqCreateUpdateDeleteShipContract";
import { hasValidAccess } from '../accessControl/hasValidAccess';

class Response extends ResponseBase {

}

export async function deleteShipContract(req: HttpRequest): Promise<Response> {
  try {

    const userAccess = await hasValidAccess(req);

    if (!userAccess.is_valid) {
      return {
        is_valid: false,
        message: "Access denied, you don't have sufficient permission."
      }
    }

    // For delete get the request query parameter
    const params = new ReqCreateUpdateDeleteShipContract();
    params.ship_contract_id = req?.query?.ship_contract_id ?? null;

    // Validate request body
    if (params.ship_contract_id == null) {
      return {
        is_valid: false,
        message: "Ship contract id is required."
      };
    }

    // Perform action

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let contractId: string;
    if (process.env["MockDbResponse"] == "yes") {
      contractId = "FDFB08FE-A4AD-4B44-B64E-12FE28DCBA1D";
    } else {
      contractId = (await data.deleteShipContract(params.ship_contract_id)).contract_id;
    };

    if (contractId) {
      return {
        is_valid: true,
        message: `Ship contract is successfully deleted. Ref ship contract id: ${contractId}.`
      }
    }

    return {
      is_valid: false,
      message: `Ship contract deletion failed due to unknown reason.`
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: error.message
    }
  }
}
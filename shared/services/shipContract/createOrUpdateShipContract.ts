import data from '../../data/handler/shipContract';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqCreateUpdateDeleteShipContract } from "../../models/shipContract/ReqCreateUpdateDeleteShipContract";
import * as jf from 'joiful';
import { hasValidAccess } from '../accessControl/hasValidAccess';

class Response extends ResponseBase {
  data: { ship_contract_id: string } = {
    ship_contract_id: null
  }
}

export async function createOrUpdateShipContract(req: HttpRequest): Promise<Response> {
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
    const params = new ReqCreateUpdateDeleteShipContract();
    params.updated_by = userAccess.loggedin_userid;
    params.ship_contract_id = req?.body?.ship_contract_id ?? null;
    params.ship_code = req?.body?.ship_code ?? null;
    params.ship_purpose_code = req?.body?.ship_purpose_code ?? null;
    params.contract_start = req?.body?.contract_start ?? null;
    params.contract_end = req?.body?.contract_end ?? null;

    // Validate request body
    const joiValidation = jf.validate(params);

    if (joiValidation.error) {
      return {
        is_valid: false,
        message: joiValidation.error.message,
        data: null
      };
    }

    // Data validation
    if (params.contract_start > params.contract_end) {
      return {
        is_valid: false,
        message: "Contract start date must be less than contract end date.",
        data: null
      };
    }

    // Perform action
    if (req.method == "POST") {
      return await createShipContract(params);
    }

    if (req.method == "PUT") {
      return await updateShipContract(params);
    }

    // Exist to ensure thread safety
    return new Response();
  }
  catch (error) {
    return {
      is_valid: false,
      message: error.message,
      data: null
    }
  }

}

async function createShipContract(params: ReqCreateUpdateDeleteShipContract): Promise<Response> {
  try {

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let contractId: string;
    if (process.env["MockDbResponse"] == "yes") {
      contractId = "FDFB08FE-A4AD-4B44-B64E-12FE28DCBA1D";
    } else {
      contractId = (await data.createShipContract(params)).contract_id;
    };

    if (contractId) {
      return {
        is_valid: true,
        message: `Ship contract is successfully created. Ref ship contract id: ${contractId}.`,
        data: {
          ship_contract_id: contractId
        }
      }
    }

    return {
      is_valid: false,
      message: `Ship contract creation failed due to unknown reason.`,
      data: null
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: `Ship contract creation failed. Error message: ${error.message}.`,
      data: null
    }
  }
}

async function updateShipContract(params: ReqCreateUpdateDeleteShipContract): Promise<Response> {
  try {

    if (params.ship_contract_id == null) {
      return {
        is_valid: false,
        message: `Ship contract id is required.`,
        data: null
      }
    };

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let contractId: string;
    if (process.env["MockDbResponse"] == "yes") {
      contractId = "FDFB08FE-A4AD-4B44-B64E-12FE28DCBA1D";
    } else {
      contractId = (await data.updateShipContract(params)).contract_id;
    };

    if (contractId) {
      return {
        is_valid: true,
        message: `Ship contract is successfully updated. Ref ship contract id: ${contractId}.`,
        data: {
          ship_contract_id: contractId
        }
      }
    }

    return {
      is_valid: false,
      message: `Ship contract update failed due to unknown reason.`,
      data: null
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: `Ship contract update failed. Error message: ${error.message}.`,
      data: null
    }
  }
}

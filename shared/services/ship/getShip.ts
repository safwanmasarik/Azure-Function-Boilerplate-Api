import { JsonConvert } from "json2typescript";
import data from '../../data/handler/ship';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqGetShip } from "../../models/ship/ReqGetShip";
import * as jf from 'joiful';
import { DbShip } from "../../models/ship/DbShip";

let jsonConvert: JsonConvert = new JsonConvert();

class Response extends ResponseBase {
  data: DbShip[] = [];
}

export async function getShip(req: HttpRequest): Promise<Response> {
  try {
    // Get request query parameter
    const params = new ReqGetShip();
    params.ship_name = req?.query?.ship_name ?? null;
    params.ship_code = req?.query?.ship_code ?? null;

    // Validate request query parameter
    const joiValidation = jf.validate(params);

    if (joiValidation.error) {
      return {
        is_valid: false,
        message: joiValidation.error.message,
        data: null
      };
    };

    const queryData = await data.getShip(params);
    let modelledDbData = jsonConvert.deserializeArray(queryData, DbShip);

    return {
      is_valid: true,
      message: "Data retrieved successfully.",
      data: modelledDbData
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: error.message,
      data: []
    }
  }
}
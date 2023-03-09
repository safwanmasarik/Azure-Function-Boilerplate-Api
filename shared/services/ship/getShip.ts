import { JsonConvert } from "json2typescript";
import data from '../../data/handler/ship';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { ReqGetShip } from "../../models/ship/ReqGetShip";
import * as jf from 'joiful';
import { DbShip } from "../../models/ship/DbShip";
import mock_data_getShip from "../../../az_http_ship/__tests__/mock_data_getShip";
import Enumerable from "linq";

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

    /** Mocking db response.
     *  When actual database connection is available,
     *  then remove this mocking condition and "MockDbResponse" config.
     */
    let queryData: object[];
    if (process.env["MockDbResponse"] == "yes") {
      queryData = mock_data_getShip
    } else {
      queryData = await data.getShip(params);
    };

    let modelledDbData = jsonConvert.deserializeArray(queryData, DbShip);

    // Sort data
    modelledDbData = Enumerable.from(modelledDbData).orderBy(s => s.ship_id).toArray();

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
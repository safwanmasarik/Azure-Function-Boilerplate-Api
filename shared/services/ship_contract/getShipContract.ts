import { JsonConvert } from "json2typescript";
import * as data from '../../data/handler/ship_contract/getShipContract';
import { HttpRequest } from "@azure/functions";
import { ResponseBase } from "../../models/ResponseBase";
import { DbShipContract } from "../../models/ship_contract/DbShipContract";
import Enumerable from "linq";
import { Helper } from "../../helpers/helper/helper";
import { ReqGetShipContract } from "../../models/ship_contract/ReqGetShipContract";
import * as jf from 'joiful';

let jsonConvert: JsonConvert = new JsonConvert();

class Response extends ResponseBase {
  data: DataObject = null;
}

class DataObject {
  group_by_ship_purposes: DataGroupByShipPurpose[] = []
  group_by_ships: DataGroupByShip[] = [];
}

class DataGroupByShipPurpose {
  ship_purpose_code: string = null;
  ship_contracts_data: DataShipContract[] = [];
  contracts_count: number = 0;
}

class DataGroupByShip {
  ship_code: string = null;
  ship_contracts_data: DataShipContract[] = [];
  contracts_count: number;
}

class DataShipContract {
  contract_id: string = null;
  ship: { name: string, code: string } = null;
  ship_purpose: { name: string, code: string } = null;
  contract: { start: Date, end: Date } = null;
}

export async function getShipContract(req: HttpRequest): Promise<Response> {
  try {
    // Get request query parameter
    const params = new ReqGetShipContract();
    params.ship_name = req?.query?.ship_name ?? null;
    params.ship_code = req?.query?.ship_code ?? null;
    params.ship_contract_id = req?.query?.ship_contract_id ?? null;
    params.ship_purpose_code = req?.query?.ship_purpose_code ?? null;

    // Validate request query parameter
    const joiValidation = jf.validate(params);

    if (joiValidation.error) {
      return {
        is_valid: false,
        message: joiValidation.error.message,
        data: null
      };
    }

    const queryData = await data.getShipContract(params);
    let modelledDbData = jsonConvert.deserializeArray(queryData, DbShipContract);

    // Map data
    let dataObject: DataObject = MapData(modelledDbData);

    return {
      is_valid: true,
      message: "Data retrieved successfully.",
      data: dataObject
    }
  }
  catch (error) {
    return {
      is_valid: false,
      message: error.message,
      data: null
    }
  }
}

function MapData(modelledDbData: DbShipContract[]): DataObject {

  let dataObject = new DataObject();

  let groupDataByShipPurpose: Array<DbShipContract[]> = Helper.GroupBy(modelledDbData, function (item: DbShipContract) {
    return [item.ship_purpose_code];
  });

  for (const uniqueShipPurpose of groupDataByShipPurpose) {
    dataObject.group_by_ship_purposes.push(
      {
        ship_purpose_code: uniqueShipPurpose[0].ship_purpose_code,
        ship_contracts_data: MapShipContractData(uniqueShipPurpose),
        contracts_count: null
      }
    )
  };

  let groupDataByShip: Array<DbShipContract[]> = Helper.GroupBy(modelledDbData, function (item: DbShipContract) {
    return [item.ship_code];
  });

  for (const uniqueShip of groupDataByShip) {
    dataObject.group_by_ships.push(
      {
        ship_code: uniqueShip[0].ship_code,
        ship_contracts_data: MapShipContractData(uniqueShip),
        contracts_count: null
      }
    )
  };

  for (const obj of dataObject.group_by_ship_purposes) {
    obj.contracts_count = Enumerable.from(obj.ship_contracts_data).count();
  };

  for (const obj of dataObject.group_by_ships) {
    obj.contracts_count = Enumerable.from(obj.ship_contracts_data).count();
  };

  return dataObject;
}

function MapShipContractData(dbShipContracts: DbShipContract[]): DataShipContract[] {
  let transformedShipContracts: DataShipContract[] = [];

  for (const dbShipContract of dbShipContracts) {
    transformedShipContracts.push(
      {
        contract_id: dbShipContract.contract_id,
        contract: {
          start: dbShipContract.contract_start,
          end: dbShipContract.contract_end
        },
        ship: {
          code: dbShipContract.ship_code,
          name: dbShipContract.ship_name
        },
        ship_purpose: {
          code: dbShipContract.ship_purpose_code,
          name: dbShipContract.ship_purpose_name
        }
      }
    )
  }

  return transformedShipContracts;
}

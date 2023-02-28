import 'reflect-metadata';
import * as jf from 'joiful';

export class ReqGetShipContract {

  @jf.string().optional().allow(null, "")
  ship_contract_id: string;

  @jf.string().optional().allow(null, "")
  ship_name: string;

  @jf.string().optional().allow(null, "")
  ship_code: string;

  @jf.string().optional().allow(null, "")
  ship_purpose_code: string;
}


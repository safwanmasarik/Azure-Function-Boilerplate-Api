import 'reflect-metadata';
import * as jf from 'joiful';

export class ReqGetShip {

  @jf.string().optional().allow(null, "")
  ship_name: string = null;

  @jf.string().optional().allow(null, "")
  ship_code: string = null;
}


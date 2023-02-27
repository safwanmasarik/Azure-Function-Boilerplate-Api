import 'reflect-metadata';
import * as jf from 'joiful';

export class ReqCreateUpdateDeleteShip {

  @jf.any().optional()
  ship_id: string;

  @jf.string().required()
  ship_name: string;

  @jf.string().required()
  ship_code: string;

  @jf.string().required()
  updated_by: string;
}


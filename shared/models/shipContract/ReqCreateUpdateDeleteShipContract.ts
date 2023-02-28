import 'reflect-metadata';
import * as jf from 'joiful';

export class ReqCreateUpdateDeleteShipContract {

  @jf.any().optional()
  ship_contract_id: string;

  @jf.string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab case ('kebab-case')")
    .required()
  ship_code: string;

  @jf.string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab case ('kebab-case')")
    .required()
  ship_purpose_code: string;

  @jf.date().required()
  contract_start: Date;

  @jf.date().required()
  contract_end: Date;

  @jf.string().required()
  updated_by: string;
}


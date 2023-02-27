import 'reflect-metadata';
import * as jf from 'joiful';

export class ReqCreateUpdateDeleteShip {

  @jf.any().optional()
  ship_id: string;

  @jf.string().required()
  ship_name: string;

  @jf.string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab case ('kebab-case', 'going-12-merry', 'jackson')")
    .required()
  ship_code: string;

  @jf.string().required()
  updated_by: string;
}


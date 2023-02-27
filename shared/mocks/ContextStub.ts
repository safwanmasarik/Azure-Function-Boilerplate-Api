import { BindingDefinition, Context, ContextBindingData, ContextBindings, ExecutionContext, HttpRequest, Logger, TraceContext } from "@azure/functions";

export default class ContextStub implements Context {
  invocationId: string;
  executionContext: ExecutionContext;
  bindings: ContextBindings;
  bindingData: ContextBindingData;
  traceContext: TraceContext;
  bindingDefinitions: BindingDefinition[];
  log: Logger;
  
  done(err?: string | Error, result?: any): void {
    throw new Error("Method not implemented.");
  }
  req?: HttpRequest;
  res?: { [key: string]: any; };

  constructor() {
    this.res =
    {
      send: function () { },
      json: function (d) {
        this.json = d;
        return this;
      },
      status: function (s) {
        this.statusCode = s;
        return this;
      }
    };
    const log = (...args) => { };
    log.verbose = (...args) => { };
    log.info = (...args) => { };
    log.warn = (...args) => { };
    log.error = (...args) => { };
    this.log = log;
    this.req = {
      headers: null,
      method: null,
      params: null,
      query: null,
      url: null,
      body: null,
    }
  }

}
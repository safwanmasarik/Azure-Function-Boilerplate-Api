import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../../helpers/json-converter";

@JsonObject("DbShipContract")
export class DbShipContract {
  @JsonProperty("contract_id", String, true)
  contract_id: string = null;

  @JsonProperty("ship_code", String, true)
  ship_code: string = null;

  @JsonProperty("ship_name", String, true)
  ship_name: string = null;

  @JsonProperty("ship_purpose_code", String, true)
  ship_purpose_code: string = null;

  @JsonProperty("ship_purpose_name", String, true)
  ship_purpose_name: string = null;

  @JsonProperty("ship_contract_start", DateConverter, true)
  contract_start: Date = null;

  @JsonProperty("ship_contract_end", DateConverter, true)
  contract_end: Date = null;

  @JsonProperty("contract_updated_date", DateConverter, true)
  contract_updated_date: Date = null;

  @JsonProperty("contract_updated_by", String, true)
  contract_updated_by: string = null;
}

import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../../helpers/json-converter";

@JsonObject("DbShip")
export class DbShip {
  @JsonProperty("id", Number, true)
  ship_id: number = null;

  @JsonProperty("name", String, true)
  ship_name: string = null;

  @JsonProperty("code", String, true)
  ship_code: string = null;

  @JsonProperty("is_active", Boolean, true)
  is_active: boolean = null;

  @JsonProperty("updated_date", DateConverter, true)
  updated_date: Date = null;
}

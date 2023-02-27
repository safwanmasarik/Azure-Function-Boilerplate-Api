import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../../helpers/json-converter";

@JsonObject("DbVoyageFeedback")
export class DbVoyageFeedback {
  @JsonProperty("voyage_feedback_id", Number, true)
  voyage_feedback_id: number = null;

  @JsonProperty("trip_id", String, true)
  trip_id: string = null;

  @JsonProperty("comment", String, true)
  comment: string = null;

  @JsonProperty("created_date", DateConverter, true)
  created_date: Date = null;

  @JsonProperty("updated_date", DateConverter, true)
  updated_date: Date = null;

  @JsonProperty("display_name", String, true)
  user_name: string = null;

  @JsonProperty("email", String, true)
  user_email: string = null;

  @JsonProperty("is_self_comment", Boolean, true)
  is_self_comment: boolean = null;
}

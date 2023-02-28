import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("DbUser")
export class DbUser {

    @JsonProperty("id", String, true)
    user_id: string = null;

    @JsonProperty("display_name", String, true)
    display_name: string = null;

    @JsonProperty("email", String, true)
    email: string = null;

    @JsonProperty("is_active", Boolean, true)
    is_active: boolean = null;
}
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("DbUser")
export class DbUser {

    @JsonProperty("id", String, true)
    user_id: string;

    @JsonProperty("display_name", String, true)
    display_name: string;

    @JsonProperty("email", String, true)
    email: string;

    @JsonProperty("is_active", Boolean, true)
    is_active: boolean;
}
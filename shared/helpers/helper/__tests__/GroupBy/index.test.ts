import { Helper } from "../../helper";
import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../../../json-converter";
import users_data from "./test-data/users.json"

const jsonConvert: JsonConvert = new JsonConvert();

describe("Test Helper.GroupBy", () => {

  it(`group by country, gender`, async () => {

    // Arrange
    const users: User[] = jsonConvert.deserializeArray(users_data, User);
    const expected_result = [
      [
        {
          name: "Abon",
          birth_date: new Date("1994-06-21"),
          country: "Malaysia",
          gender: "Male",
        },
      ],
      [
        {
          name: "John",
          birth_date: new Date("2000-06-21"),
          country: "Singapore",
          gender: "Male",
        },
        {
          name: "Gordon",
          birth_date: new Date("1980-06-21"),
          country: "Singapore",
          gender: "Male",
        }
      ],
      [
        {
          name: "Jane",
          birth_date: new Date("1994-06-21"),
          country: "Singapore",
          gender: "Female",
        },
        {
          name: "Cassey",
          birth_date: new Date("1994-06-21"),
          country: "Singapore",
          gender: "Female",
        },
      ],
      [
        {
          name: "Jhol",
          birth_date: new Date("2000-06-21"),
          country: "Malaysia",
          gender: "Female",
        },
      ],
    ]

    // Act
    let result: Array<User[]> = Helper.GroupBy(users, function (user: User) {
      return [user.country, user.gender];
    });

    // Assert
    expect(result).toEqual(expected_result);
  });

  it(`group by birth date`, async () => {

    // Arrange
    const users: User[] = jsonConvert.deserializeArray(users_data, User);
    const expected_result = [
      [
        {
          name: "Abon",
          birth_date: new Date("1994-06-21"),
          country: "Malaysia",
          gender: "Male",
        },
        {
          name: "Jane",
          birth_date: new Date("1994-06-21"),
          country: "Singapore",
          gender: "Female",
        },
        {
          name: "Cassey",
          birth_date: new Date("1994-06-21"),
          country: "Singapore",
          gender: "Female",
        },
      ],
      [
        {
          name: "John",
          birth_date: new Date("2000-06-21"),
          country: "Singapore",
          gender: "Male",
        },
        {
          name: "Jhol",
          birth_date: new Date("2000-06-21"),
          country: "Malaysia",
          gender: "Female",
        },
      ],
      [
        {
          name: "Gordon",
          birth_date: new Date("1980-06-21"),
          country: "Singapore",
          gender: "Male",
        },
      ],
    ]

    // Act
    let result: Array<User[]> = Helper.GroupBy(users, function (user: User) {
      return [user.birth_date];
    });

    // Assert
    expect(result).toEqual(expected_result);
  });

});

@JsonObject("User")
class User {
  @JsonProperty("name", String, true)
  name: string = null;

  @JsonProperty("birth_date", DateConverter, true)
  birth_date: Date = null;

  @JsonProperty("country", String, true)
  country: string = null;

  @JsonProperty("gender", String, true)
  gender: string = null;
}
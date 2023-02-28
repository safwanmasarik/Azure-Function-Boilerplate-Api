import az_http_shipContract from "../index";
import ContextStub from "../../shared/mocks/ContextStub";

import { getShipContract as data_getShipContract } from '../../shared/data/handler/shipContract/getShipContract';
import { createShipContract as data_createShipContract } from '../../shared/data/handler/shipContract/createShipContract';
import { updateShipContract as data_updateShipContract } from '../../shared/data/handler/shipContract/updateShipContract';
import { deleteShipContract as data_deleteShipContract } from '../../shared/data/handler/shipContract/deleteShipContract';
import { getUser as data_getUser } from '../../shared/data/handler/accessControl/getUser';

import mock_data_getShipContract from "./mock_data_getShipContract";
import mock_data_getUser from "./mock_data_getUser";

jest.mock('../../shared/data/handler/shipContract/getShipContract');
jest.mock('../../shared/data/handler/shipContract/createShipContract');
jest.mock('../../shared/data/handler/shipContract/updateShipContract');
jest.mock('../../shared/data/handler/shipContract/deleteShipContract');
jest.mock('../../shared/data/handler/accessControl/getUser');

describe("Test az_http_shipContract function", () => {

  let context: ContextStub;

  beforeEach(() => {
    context = new ContextStub();
  });

  /**
   * Unit Test - Successful retrieval of ship contract data
   * Given  API request is a GET request or connection is establised.
   * Then   API returns status code 200 and with a response payload.
   * And    data is returned in response successfully.
   */
  it(`Send GET request and return ship contract data.`, async () => {

    // Arrange
    (data_getShipContract as jest.Mock).mockResolvedValue(mock_data_getShipContract);

    const request = {
      method: "GET",
      query: {
        ship_name: null,
        ship_code: null,
        ship_contract_id: null,
        ship_purpose_code: null
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("successful");
    expect(response.json.data.group_by_ship_purposes.length).toBeGreaterThan(0);
  });


  /**
   * Unit Test - Successful creation of ship contract data
   * Given  ship exist.
   * When   contract end date is higher than contract start date
   * Then   contract is created successfully.
   */
  it(`Send POST request and succesfully create ship contract data.`, async () => {

    // Arrange
    (data_createShipContract as jest.Mock).mockResolvedValue({ contract_id: "273655B7-3DCF-4215-877C-0F8973751A3E" });
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "POST",
      body: {
        "ship_code": "millennium-falcon",
        "ship_purpose_code": "transport-oil",
        "contract_start": "2023-06-01",
        "contract_end": "2023-06-30"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("successful");
  });


  /**
   * Unit Test - Fail to create ship contract contract
   * Given  ship exist.
   * When   contract end date is lower than contract start date
   * Then   contract creation fails with expected error message.
   */
  it(`Send POST request and fail to create ship contract data due to contract end date is lower than contract start date.`, async () => {

    // Arrange
    (data_createShipContract as jest.Mock).mockResolvedValue({ contract_id: "273655B7-3DCF-4215-877C-0F8973751A3E" });
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "POST",
      body: {
        "ship_code": "millennium-falcon",
        "ship_purpose_code": "transport-oil",
        "contract_start": "2023-06-30",
        "contract_end": "2023-06-01"
      }
    }

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(false);
    expect(response.json.message).toContain("Contract start date must be less than contract end date.");
  });


  /**
   * Unit Test - Successful update of ship contract data
   * Given  ship exist
   * And    contract exist
   * When   request is sent with the required data
   * Then   contract is updated successfully.
   */
  it(`Send PUT request and succesfully update ship contract data.`, async () => {

    // Arrange
    (data_updateShipContract as jest.Mock).mockResolvedValue({ contract_id: "273655B7-3DCF-4215-877C-0F8973751A3E" });
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "PUT",
      body: {
        "ship_contract_id": "B21BA982-E0C4-4234-A184-58E7DCDE40E1",
        "ship_code": "millennium-falcon",
        "ship_purpose_code": "transport-passenger",
        "contract_start": "2023-06-01",
        "contract_end": "2023-06-30"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("contract is successfully updated");
  });


  /**
   * Unit Test - Fail update of ship contract data
   * Given  contract does not exist
   * When   request is sent with the required data
   * Then   contract fail to update with message missing contract id-.
   */
  it(`Send PUT request and fail to update ship contract due to contract does not exist`, async () => {

    // Arrange
    (data_updateShipContract as jest.Mock).mockResolvedValue("5756B70B-0BC5-4859-B321-E0EFFF7FBA8F");
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "PUT",
      body: {
        "ship_code": "millennium-falcon",
        "ship_purpose_code": "transport-passenger",
        "contract_start": "2023-06-01",
        "contract_end": "2023-06-30"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(false);
    expect(response.json.message).toContain("Ship contract id is required");
  });


  /** Unit Test - Successful delete of ship contract data 
   * Given  contract exist
   * When   request sent with the contract id
   * Then   contract is successfully deleted
  */
  it(`Send DELETE request and succesfully delete ship contract data.`, async () => {

    // Arrange
    (data_deleteShipContract as jest.Mock).mockResolvedValue({ contract_id: "273655B7-3DCF-4215-877C-0F8973751A3E" });
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "DELETE",
      query: {
        ship_contract_id: "273655B7-3DCF-4215-877C-0F8973751A3E"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("successful");
  });

});

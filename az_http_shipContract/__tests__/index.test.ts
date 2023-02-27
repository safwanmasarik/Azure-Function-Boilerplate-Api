import az_http_shipContract from "../index";
import ContextStub from "../../shared/mocks/ContextStub";

import { getShipContract as data_getShipContract } from '../../shared/data/handler/ship_contract/getShipContract';
import { createShipContract as data_createShipContract } from '../../shared/data/handler/ship_contract/createShipContract';
import { updateShipContract as data_updateShipContract } from '../../shared/data/handler/ship_contract/updateShipContract';
import { deleteShipContract as data_deleteShipContract } from '../../shared/data/handler/ship_contract/deleteShipContract';
import { getUser as data_getUser } from '../../shared/data/handler/access_control/getUser';

import mock_data_getShipContract from "./mock_data_getShipContract";
import mock_data_getUser from "./mock_data_getUser";

jest.mock('../../shared/data/handler/ship_contract/getShipContract');
jest.mock('../../shared/data/handler/ship_contract/createShipContract');
jest.mock('../../shared/data/handler/ship_contract/updateShipContract');
jest.mock('../../shared/data/handler/ship_contract/deleteShipContract');

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
      method: "GET"
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("successful");
    expect(response.json.data_by_vessels[0].vessel_id).not.toBeNull();
  });


  /**
   * Unit Test - Successful creation of ship contract data
   * Given  ship exist.
   * When   contract end date is higher than contract start date
   * Then   contract is created successfully.
   */
  it(`Send POST request and succesfully create ship contract data.`, async () => {

    // Arrange
    (data_createShipContract as jest.Mock).mockResolvedValue("273655B7-3DCF-4215-877C-0F8973751A3E");
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "POST",
      body: {
        "vessel_id": 533062100,
        "region_code": "SKA",
        "contract_start": "2023-10-10",
        "contract_end": "2023-10-16",
        "primary_job_type_id": 7,
        "primary_job_type_comment": "",
        "managed_by": "OLV",
        "secondary_jobs": [
          {
            "contract_start": "2023-10-11",
            "contract_end": "2023-10-12",
            "secondary_job_type_id": 2,
            "secondary_job_type_comment": "",
            "secondary_managed_by": "someone",
            "secondary_region_code": "something"
          },
          {
            "contract_start": "2023-10-13",
            "contract_end": "2023-10-14",
            "secondary_job_type_id": 2,
            "secondary_job_type_comment": "",
            "secondary_managed_by": "someone",
            "secondary_region_code": "something"
          }
        ]
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
    (data_createShipContract as jest.Mock).mockResolvedValue("28735895-D14E-4EC8-B787-C6777CEA6A05");
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "POST",
      body: {
        "vessel_id": 533130329,
        "region_code": "SKA",
        "contract_start": "2023-10-10",
        "contract_end": "2023-10-16",
        "primary_job_type_id": 6,
        "primary_job_type_comment": "Danial Test",
        "managed_by": "OLV",
        "secondary_jobs": [
          {
            "contract_start": "2023-10-11",
            "contract_end": "2023-10-12",
            "secondary_job_type_id": 2,
            "secondary_job_type_comment": "",
            "secondary_managed_by": "Black Adam",
            "secondary_region_code": "DCEU"
          },
          {
            "contract_start": "2023-10-13",
            "contract_end": "2023-10-14",
            "secondary_job_type_id": 2,
            "secondary_job_type_comment": "",
            "secondary_managed_by": "Dr Faith",
            "secondary_region_code": "DCEU"
          }
        ]
      }
    }

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(false);
    expect(response.json.message).toContain("Primary contract: [Primary contract dates overlap with existing contract date between");
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
    (data_updateShipContract as jest.Mock).mockResolvedValue("5756B70B-0BC5-4859-B321-E0EFFF7FBA8F");
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "PUT",
      body: {
        "primary_management_id": "5756B70B-0BC5-4859-B321-E0EFFF7FBA8F",
        "vessel_id": 533130329,
        "vessel_name": "YINSON HERMES",
        "region_code": "PMA",
        "contract_start": "2023-01-01",
        "contract_end": "2023-01-10",
        "primary_job_type_id": 4,
        "primary_job_type_comment": "Danial Test",
        "secondary_jobs": [],
        "managed_by": "OLV"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(true);
    expect(response.json.message).toContain("Contract is successfully updated. Ref primary management id:");
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
        "primary_management_id": "5756B70B-0BC5-4859-B321-E0EFFF7FBA8F",
        "vessel_id": 533130329,
        "vessel_name": "YINSON HERMES",
        "region_code": "PMA",
        "contract_start": "2024-01-01",
        "contract_end": "2024-01-10",
        "primary_job_type_id": 4,
        "primary_job_type_comment": "Danial Test",
        "secondary_jobs": [],
        "managed_by": "OLV"
      }
    };

    // Act
    const response = await az_http_shipContract(context, request);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json.is_valid).toEqual(false);
    expect(response.json.message).toContain("Primary contract: [Primary contract dates overlap with existing contract date between");
  });


  /** Unit Test - Successful delete of ship contract data 
   * Given  contract exist
   * When   request sent with the contract id
   * Then   contract is successfully deleted
  */
  it(`Send DELETE request and succesfully delete ship contract data.`, async () => {

    // Arrange
    (data_deleteShipContract as jest.Mock).mockResolvedValue("A3B1B39C-6003-4773-A83B-D6935023BB04");
    (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

    const request = {
      method: "DELETE",
      body: {
        "primary_management_id": "088719FA-89CB-4452-9963-E8FC408C2FFA"
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

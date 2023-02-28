import az_http_ship from "../index";
import ContextStub from "../../shared/mocks/ContextStub";

import { getShip as data_getShip } from '../../shared/data/handler/ship/getShip';
import { createShip as data_createShip } from '../../shared/data/handler/ship/createShip';
import { deleteShip as data_deleteShip } from '../../shared/data/handler/ship/deleteShip';
import { updateShip as data_updateShip } from '../../shared/data/handler/ship/updateShip';
import { getUser as data_getUser } from '../../shared/data/handler/access_control/getUser';

import mock_data_getShip from "./mock_data_getShip";
import mock_data_getUser from "./mock_data_getUser";

jest.mock('../../shared/data/handler/ship/getShip');
jest.mock('../../shared/data/handler/ship/createShip');
jest.mock('../../shared/data/handler/ship/deleteShip');
jest.mock('../../shared/data/handler/ship/updateShip');
jest.mock('../../shared/data/handler/access_control/getUser');

describe("Test az_http_ship function", () => {
    let context: ContextStub;

    beforeEach(() => {
        context = new ContextStub();
    });

    it(`Send GET request and return ship data.`, async () => {

        // Arrange
        (data_getShip as jest.Mock).mockResolvedValue(mock_data_getShip);

        const request = {
            method: "GET",
            query: {
                ship_code: "red-force",
                ship_name: "Red Force"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
        expect(response.json.data.length).toBeGreaterThan(0);
    });

    it(`Send POST request and succesfully create ship.`, async () => {

        // Arrange
        (data_createShip as jest.Mock).mockResolvedValue({ ship_id: 25 });
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "POST",
            body: {
                ship_name: "Oro Jackson",
                ship_code: "oro-jackson"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
    });

    it(`Send POST request and fail create ship because ship code does not match kebab case.`, async () => {

        // Arrange
        (data_createShip as jest.Mock).mockResolvedValue({ ship_id: 25 });
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "POST",
            body: {
                ship_name: "Oro Jackson",
                ship_code: "oroJackson"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(false);
        expect(response.json.message).toContain("fail");
        expect(response.json.message).toContain("kebab");
    });

    it(`Send PUT request and succesfully update ship data.`, async () => {

        // Arrange
        (data_updateShip as jest.Mock).mockResolvedValue({ ship_id: 25 });
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "PUT",
            body: {
                "ship_id": 24,
                "ship_name": "12 ABC Cocomelon Ship",
                "ship_code": "12-abc-cocomelon"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
    });

    it(`Send DELETE request and succesfully delete ship data.`, async () => {

        // Arrange
        (data_deleteShip as jest.Mock).mockResolvedValue({ ship_code: "abc" });
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "DELETE",
            query: {
                ship_code: "red-force",
                is_permanent_delete: true
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
    });
})
import az_http_ship from "../index";
import ContextStub from "../../shared/mocks/ContextStub";

import { getShip as data_getShip } from '../../shared/data/handler/ship/getShip';
import { createShip as data_createShip } from '../../shared/data/handler/ship/createShip';
import { deleteShip as data_deleteVoyageFeedback } from '../../shared/data/handler/ship/deleteShip';
import { updateShip as data_updateShip } from '../../shared/data/handler/ship/updateShip';
import { getUser as data_getUser } from '../../shared/data/handler/access_control/getUser';

import mock_data_getShip from "./mock_data_getShip";
import mock_data_getUser from "./mock_data_getUser";

jest.mock('../../shared/data/handler/ship/getShip');
jest.mock('../../shared/data/handler/ship/createShip');
jest.mock('../../shared/data/handler/ship/deleteShip');
jest.mock('../../shared/data/handler/ship/updateShip');

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
                "trip_id": "2022-04-24_GRADE ONE MANJUNG 2"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
        expect(response.json.trip_id).not.toBeNull();
    });

    it(`Send POST request and succesfully create ship.`, async () => {

        // Arrange
        (data_createShip as jest.Mock).mockResolvedValue("273655B7-3DCF-4215-877C-0F8973751A3E");
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "POST",
            body: {
                "trip_id": "2022-04-24_GRADE ONE MANJUNG 2",
                "comment": "voyage was awesome, weather was good!"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
    });

    it(`Send PUT request and succesfully update ship data.`, async () => {

        // Arrange
        (data_updateShip as jest.Mock).mockResolvedValue("273655B7-3DCF-4215-877C-0F8973751A3E");
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "PUT",
            body: {
                "voyage_feedback_id": 8,
                "comment": "(api update) Number 4, Hello bonjour, safwan testing! Veghi nice thrip comment4~"
            }
        };

        // Act
        const response = await az_http_ship(context, request);

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.json.is_valid).toEqual(true);
        expect(response.json.message).toContain("successful");
    });

    it(`Send DELETE request and succesfully delete voyage feedback data.`, async () => {

        // Arrange
        (data_deleteVoyageFeedback as jest.Mock).mockResolvedValue("273655B7-3DCF-4215-877C-0F8973751A3E");
        (data_getUser as jest.Mock).mockResolvedValue(mock_data_getUser);

        const request = {
            method: "DELETE",
            body: {
                "voyage_feedback_id": 7
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
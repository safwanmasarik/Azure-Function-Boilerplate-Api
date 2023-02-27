import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import ship_service from '../shared/services/ship'

const az_http_ship: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    if (req.method == "GET") {
        const response = await ship_service.getShip(req);
        return context.res.status(200).json(response);
    }

    if (req.method == "POST") {
        const response = await ship_service.createShip(req);
        return context.res.status(200).json(response);
    }

    if (req.method == "PUT") {
        const response = await ship_service.updateShip(req);
        return context.res.status(200).json(response);
    }

    if (req.method == "DELETE") {
        const response = await ship_service.deleteShip(req);
        return context.res.status(200).json(response);
    }
};

export default az_http_ship;
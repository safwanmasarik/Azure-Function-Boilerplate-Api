import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import shipContractService from '../shared/services/ship_contract'

const az_http_shipContract: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    if (req.method == "GET") {
        const response = await shipContractService.getShipContract(req);
        return context.res.status(200).json(response);
    }

    if (req.method == "POST" || req.method == "PUT") {
        const response = await shipContractService.createOrUpdateShipContract(req);
        return context.res.status(200).json(response);
    }

    if (req.method == "DELETE") {
        const response = await shipContractService.deleteShipContract(req);
        return context.res.status(200).json(response);
    }
};

export default az_http_shipContract;
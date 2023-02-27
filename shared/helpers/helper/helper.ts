import jwt_decode from "jwt-decode";
import _ from "lodash";

export class Helper {

    static GroupBy(array: any[], f: Function) {
        let groups = {};
        array.forEach(function (o) {
            let group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        })
    }

    static ConvertSQLDate = function (stringDate: string | number | Date, isConvertTime: boolean = false): string {
        if (stringDate == undefined || stringDate == null) {
            return null;
        }

        let r = null;
        let dt = new Date(stringDate);
        r = `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()}`;
        if (isConvertTime) {
            r += ` ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
        }
        return r;
    };

    static ConvertToDecimal = function (number: number, decimalPoint: number = 1): number {
        if (number == undefined || number == null) {
            return null;
        }

        return parseFloat(number.toFixed(decimalPoint))
    };

    static ConvertToPercentageNumber = function (number: number, decimalPoint: number = 1): number {
        if (number == undefined || number == null) {
            return null;
        }

        number = number * 100;
        return parseFloat(number.toFixed(decimalPoint))
    };

    static ConvertMinutestoDaysHoursMinutes = function (number: number): string {
        if (number == undefined || number == null) {
            return null;
        }

        let days = Math.floor(number / 24 / 60);
        let hours = Math.floor(number / 60 % 24);
        let minutes = Math.floor(number % 60);
        return `${days} d, ${hours} h, ${minutes} m`;
    }

    static async DecodeTokenAndGetEmail(token: string): Promise<string> {
        const decodedJWT = await jwt_decode(token);
        return _.get(decodedJWT, 'email') ?? _.get(decodedJWT, 'unique_name');
    };

}
import { JsonConvert, JsonConverter, JsonCustomConvert } from "json2typescript";

let jsonConvert: JsonConvert = new JsonConvert();

@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    deserialize(date: any): Date {
        return new Date(date);
    }
}

export async function DeserializeArrayAsync<T>(data: Promise<object[]>, classReference: { new(): T; }): Promise<T[]> {
    let modelledData = jsonConvert.deserializeArray(await data, classReference);
    return modelledData;
}
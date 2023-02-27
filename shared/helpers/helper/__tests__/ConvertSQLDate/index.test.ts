import { Helper } from '../../helper';

describe('Test Helper.ConvertSQLDate', () => {

    it(`When stringDate and isConvertTime are undefined, should return null`, () => {

        // Arrange
        const stringDate = undefined;

        // Act
        const response = Helper.ConvertSQLDate(stringDate);

        // Assert
        expect(response).toBeNull();
    });

    it(`When stringDate has string value and isConvertTime is undefined, should return value`, () => {

        // Arrange
        const stringDate = '2021-07-11T23:04:23';

        // Act
        const response = Helper.ConvertSQLDate(stringDate);

        // Assert
        expect(response).toStrictEqual('2021-7-11');
    });

    it(`When stringDate has string value and isConvertTime is true, should return value`, () => {

        // Arrange
        const stringDate = '2021-07-11T23:04:23';
        const isConvertTime = true;

        // Act
        const response = Helper.ConvertSQLDate(stringDate, isConvertTime);

        // Assert
        expect(response).toStrictEqual('2021-7-11 23:4:23');
    });

    it(`When stringDate has date value and isConvertTime is true, should return value`, () => {

        // Arrange
        const stringDate = new Date('2021-07-11T23:04:23');
        const isConvertTime = true;

        // Act
        const response = Helper.ConvertSQLDate(stringDate, isConvertTime);

        // Assert
        expect(response).toStrictEqual('2021-7-11 23:4:23');
    });
});

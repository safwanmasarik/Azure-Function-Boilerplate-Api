import { Helper } from '../../helper';

describe('Test Helper.ConvertToPercentageNumber', () => {

    it(`When number and decimalPoint are undefined, should return null`, () => {

        // Arrange
        const number = undefined;

        // Act
        const response = Helper.ConvertToPercentageNumber(number);

        // Assert
        expect(response).toBeNull();
    });

    it(`When number has value and decimalPoint is undefined, should return 1 decimal point`, () => {

        // Arrange
        const number = 0.73261;

        // Act
        const response = Helper.ConvertToPercentageNumber(number);

        // Assert
        expect(response).toStrictEqual(73.3);
    });

    it(`When decimalPoint is 3, should return 3 decimal points`, () => {

        // Arrange
        const number = 0.73261;
        const decimalPoint = 3;

        // Act
        const response = Helper.ConvertToPercentageNumber(number, decimalPoint);

        // Assert
        expect(response).toStrictEqual(73.261);
    });

    
    it(`When decimalPoint exceeds range, should throw error`, () => {

        // Arrange
        const number = 15.7326;
        const decimalPoint1 = -2;
        const decimalPoint2 = 101;

        // Act
        const fn1 = () => Helper.ConvertToPercentageNumber(number, decimalPoint1);
        const fn2 = () => Helper.ConvertToPercentageNumber(number, decimalPoint2);

        // Assert
        expect(fn1).toThrowError(RangeError);
        expect(fn2).toThrowError(RangeError);
    });
});

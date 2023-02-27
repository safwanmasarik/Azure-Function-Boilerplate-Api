import { Helper } from '../../helper';

describe('Test Helper.ConvertToDecimal', () => {

    it(`When number and decimalPoint are undefined, should return null`, () => {

        // Arrange
        const number = undefined;

        // Act
        const response = Helper.ConvertToDecimal(number);

        // Assert
        expect(response).toBeNull();
    });

    it(`When number has value and decimalPoint is undefined, should return default (1) decimal point`, () => {

        // Arrange
        const number = 15.7326;

        // Act
        const response = Helper.ConvertToDecimal(number);

        // Assert
        expect(response).toStrictEqual(15.7);
    });

    it(`When decimalPoint is 3, should return 3 decimal points`, () => {

        // Arrange
        const number = 15.7326;
        const decimalPoint = 3;

        // Act
        const response = Helper.ConvertToDecimal(number, decimalPoint);

        // Assert
        expect(response).toStrictEqual(15.733);
    });

    it(`When decimalPoint exceeds range, should throw error`, () => {

        // Arrange
        const number = 15.7326;
        const decimalPoint1 = -2;
        const decimalPoint2 = 101;

        // Act
        const fn1 = () => Helper.ConvertToDecimal(number, decimalPoint1);
        const fn2 = () => Helper.ConvertToDecimal(number, decimalPoint2);

        // Assert
        expect(fn1).toThrowError(RangeError);
        expect(fn2).toThrowError(RangeError);
    });
});

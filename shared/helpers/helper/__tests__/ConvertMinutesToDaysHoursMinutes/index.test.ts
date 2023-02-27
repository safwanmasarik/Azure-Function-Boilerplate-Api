import { Helper } from '../../helper';

describe('Test Helper.ConvertMinutestoDaysHoursMinutes', () => {

    it(`When number is undefined, should return null`, () => {

        // Arrange
        const number = undefined;

        // Act
        const response = Helper.ConvertMinutestoDaysHoursMinutes(number);

        // Assert
        expect(response).toBeNull();
    });

    it(`When number has value, should return days, hours and minutes value`, () => {

        // Arrange
        const number = 1573;

        // Act
        const response = Helper.ConvertMinutestoDaysHoursMinutes(number);

        // Assert
        expect(response).toStrictEqual('1 d, 2 h, 13 m');
    });
});

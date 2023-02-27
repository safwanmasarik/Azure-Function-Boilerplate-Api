import { InvalidTokenError } from 'jwt-decode';
import { Helper } from '../../helper';

describe('Test Helper.DecodeTokenAndGetEmail', () => {

    it(`When token is undefined, should throw error`, async () => {

        // Arrange
        const token = undefined;

        try {
            // Act
            const response = await Helper.DecodeTokenAndGetEmail(token);
        } catch (error) {
            // Assert
            expect(error.message).toEqual('Invalid token specified');
        }

    });

    it(`When token (dev account) has value, should return email`, async () => {

        // Arrange
        const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJkNWZlYzU5YS0yNzFiLTQ1ZTYtYTQ1My01ZTdhZTNhZTU4ZDkiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84YjI0NTUxZC03YzJjLTRiZWItOGI2MS05NWYzMmQ5OTI5ZWYvIiwiaWF0IjoxNjM1MzkzMTU2LCJuYmYiOjE2MzUzOTMxNTYsImV4cCI6MTYzNTM5NzA1NiwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhUQUFBQVJjbWRVK1lKUDVWRFZlbUY1aEU0NWhOUnIwWkxGZVZ6dzdhamx0UUlzVVE9IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjUwNTFiZDM5LWE3ZjgtNGQ1Zi1iM2NjLTNjODg5YzFmMzZkOSIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQVBJIiwiZ2l2ZW5fbmFtZSI6IkVESCIsImlwYWRkciI6IjE3NS4xMzkuNzIuNjEiLCJuYW1lIjoiRURIIEFQSSIsIm9pZCI6ImE5ZGY2OTEwLWVkMTAtNDc2Mi04ZDQ3LTIxZmI1NmI2NThiZiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yNjIxNDg0MTYxLTI0Mzk3MzYwMzktMjg1NDI0NDQ2NS00MjA5IiwicmgiOiIwLkFSc0FIVlVraXl4ODYwdUxZWlh6TFprcDd6bTlVVkQ0cDE5TnM4dzhpSndmTnRrOUFOay4iLCJzY3AiOiJPTFYuUmVhZEFsbCIsInN1YiI6IndjQnFGZXVaaS1YdXF5YlVGTzEtQXFVQWxfS2xvbDgtb2cxS1l2eVp0LUEiLCJ0aWQiOiI4YjI0NTUxZC03YzJjLTRiZWItOGI2MS05NWYzMmQ5OTI5ZWYiLCJ1bmlxdWVfbmFtZSI6ImVkaC5hcGlAcGV0aGxhYi5jb20iLCJ1cG4iOiJlZGguYXBpQHBldGhsYWIuY29tIiwidXRpIjoiZVJVcW54UEFUVTJUcW1pbnRIMFhBQSIsInZlciI6IjEuMCJ9.CGYhQXWjnIbtrspoNRIJekIbfy6sTkViaxSzf6jrEihjMpziDQ1JisUTsrEpULzBxPrWdjkPF-HBd9NWr5k-muekmfA5Bc2GuAtpuM9cYHwlrTnrLSceav0i0S0pFLHlN5RsRVbBHu3fRWZQ1ljyU6Htj_H8M1pVxJfEvcqSCHNHRBZUn3043CJTTmWgh65H6SePFZ8E6T0Z5DWaDbbhGFcpwvLdsON8Z7kOGYYT1tQ98tU8pT6v2vqBxVcTVirzrua_C7iyqFo6aP2rNvhEe_zB3wbYSysOalcea0Cp6Q5U1pD4FW6aITh4JUG0QVjCRoSO_ZjpaEaGWcHOhDWZ1g';

        // Act
        const response = await Helper.DecodeTokenAndGetEmail(token);

        // Assert
        expect(response).toStrictEqual('edh.api@pethlab.com');
    });

    it(`When token (production account) has value, should return email`, async () => {

        // Arrange
        const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIxOWIzZWZmYy1kZWIwLTQ4MzMtOWRjNy1hM2QxYzJlNjUyNDUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYjJlODk0MS03OTQ4LTQxMzEtOTc4YS1iMmRmYzcyOTUwOTEvIiwiaWF0IjoxNjQxMzQ5NDU3LCJuYmYiOjE2NDEzNDk0NTcsImV4cCI6MTY0MTM1MzM1NywiYWlvIjoiQVVRQXUvOFRBQUFBSmUvZU1LMTBROFdUd29XUXBxaGl3MGxDRldlUGZRZG9VMHFmMXdFNUhFMDN0dit5Z3JDQVhuNE9iRlpKTEFzcTRrdEw0UjJnQmR0WS9jeVVRMXRPR2c9PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiZW1haWwiOiJhZGl6YWZyYW4uemFiaWRAcGV0cm9uYXMuY29tLm15IiwiZmFtaWx5X25hbWUiOiJaYWJpZGkiLCJnaXZlbl9uYW1lIjoiQWRpIFphZnJhbiIsImlwYWRkciI6IjE3NS4xNDMuMTc0LjMzIiwibmFtZSI6IkFkaSBaYWZyYW4gWmFiaWRpIChFWFQvRElHSVRBTCkiLCJub25jZSI6ImE2NmZmNTMyLTM5YWMtNDkwMy1hNDcyLTE0ZDgwYWE1OTEzMSIsIm9pZCI6IjNmOGU4ZGU2LTNkODctNGExMi1iMWQ3LWM0ZTc4MmI1ZjA2OSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xODc5MzEzMTk1LTUyMDk3NDk0NC00MjIzNzc5NzE5LTEyMjU2MjUiLCJyaCI6IjAuQVNvQVFZa3VPMGg1TVVHWGlyTGZ4eWxRa2Z6dnN4bXczak5JbmNlajBjTG1Va1VxQUdvLiIsInN1YiI6ImJ3cTJCaldDTUlsWDFyVTAtLWpDc19EOW5vcU9JRTNIcGdHQVNOemc3UlEiLCJ0aWQiOiIzYjJlODk0MS03OTQ4LTQxMzEtOTc4YS1iMmRmYzcyOTUwOTEiLCJ1bmlxdWVfbmFtZSI6ImFkaXphZnJhbi56YWJpZEBwZXRyb25hcy5jb20iLCJ1cG4iOiJhZGl6YWZyYW4uemFiaWRAcGV0cm9uYXMuY29tIiwidXRpIjoiVGkxVGhpc0hJa2VJOERhcThnSHhBUSIsInZlciI6IjEuMCJ9.GE1bYBFwhMOsiafeR8UOvQlBcijznKlhET65rXhPdgcb0DC326rvs4ZpcvBo3qmIKIWy0odOrBq3K1DWvI5V5_DJgdNq8DNHxdAzWiGC2dd6wj4onqqCCvfur_c-TUS3r0Xe_JNAYfgxPi3jb_fvsF19EXsEloml9YJzkjpMRiMVfbRB138VqgaIxIl1XSD1NBkXL7-PSDk-oXT9335fpvs6o2ToR9VzwU7s7uWhbKnCWiaKntlOTA9XG9e5ZzhRBmuSC5M7iY7lbKLwAH3mAzZTkUmYRHAb8DuMplTROFmzmKyKKbtFU6lRejrrHSDpYTmlNV-ZKQX_DwvO8VHQqA';

        // Act
        const response = await Helper.DecodeTokenAndGetEmail(token);

        // Assert
        expect(response).toStrictEqual('adizafran.zabid@petronas.com.my');
    });

    it(`When token is invalid, should throw error`, async () => {

        // Arrange
        const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJ';

        try {
            // Act
            const response = await Helper.DecodeTokenAndGetEmail(token);
        } catch (error) {
            // Assert
            expect(error.message).toContain('Invalid token specified');
        }

    })
});

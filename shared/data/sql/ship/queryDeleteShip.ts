export let queryDeleteShip =
    `
DELETE
    [ships]
WHERE
    code = @ship_code
`;
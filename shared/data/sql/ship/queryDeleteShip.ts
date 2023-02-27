export let queryPermanentDeleteShip =
    `
DELETE
    [ships]
WHERE
    code = @ship_code
`;

export let querySoftDeleteShip =
    `
UPDATE
    [ships]
SET
    is_active = 0
WHERE
    code = @ship_code
`;
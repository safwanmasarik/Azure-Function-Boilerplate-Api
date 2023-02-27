export let queryUpdateShip =
    `
UPDATE
    [ships]
SET
    name = @ship_name,
    code = @ship_code,
    updated_by = @updated_by
WHERE
    id = @ship_id
`;
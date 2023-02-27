export let queryGetShip = `
SELECT
    s.id,
    s.name,
    s.code,
    s.is_active,
    s.updated_date
FROM
    ships [s]
WHERE
    -1 = -1
    @replace
ORDER BY
    s.name 
FOR JSON PATH
`;

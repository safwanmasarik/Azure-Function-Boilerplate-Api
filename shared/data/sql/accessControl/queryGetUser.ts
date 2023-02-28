export let queryGetUser = `
SELECT
    u.id,
    u.display_name,
    u.email,
    u.is_active
FROM
    users [u]
WHERE
    u.display_name = @display_name
FOR JSON PATH
`;

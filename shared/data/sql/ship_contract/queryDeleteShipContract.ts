export let queryDeleteShipContract =
    `
DELETE
    [ship_contracts]
WHERE
    id = @ship_contract_id
`;
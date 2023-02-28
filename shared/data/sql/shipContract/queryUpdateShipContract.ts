export let queryUpdateShipContract =
    `
UPDATE
    [ship_contracts]
SET
    ship_code = @ship_code,
    ship_purpose_code = @ship_purpose_code,
    contract_start = @contract_start_date,
    contract_end = @contract_end_date,
    updated_by = @updated_by
WHERE
    id = @ship_contract_id
`;
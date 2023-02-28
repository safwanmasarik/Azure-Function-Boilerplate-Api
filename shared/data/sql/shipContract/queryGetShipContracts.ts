export let queryGetShipContracts = `
SELECT
    sc.id [contract_id],
    sc.ship_code [ship_code],
    s.name [ship_name],
    sc.ship_purpose_code [ship_purpose_code],
    sp.name [ship_purpose_name],
    sc.contract_start [ship_contract_start],
    sc.contract_end [ship_contract_end],
    sc.updated_date [contract_updated_date],
    u.email [contract_updated_by]
FROM
    ship_contracts [sc]
    INNER JOIN ships [s] ON sc.ship_code = s.code
    INNER JOIN ship_purposes [sp] ON sp.code = sc.ship_purpose_code
    INNER JOIN users [u] ON u.id = sc.updated_by
WHERE
	-1 = -1
    @replace 
FOR JSON PATH
`;

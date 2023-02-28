export let queryCreateShipContract =
    `
DECLARE @IdentityOutput TABLE (contract_id uniqueidentifier);

INSERT INTO
    [dbo].[ship_contracts] (
        [ship_code],
        [ship_purpose_code],
        [contract_start],
        [contract_end],
        [updated_by]
    ) OUTPUT inserted.id INTO @IdentityOutput
VALUES
    (
        @ship_code,
        @ship_purpose_code,
        @contract_start_date,
        @contract_end_date,
        @updated_by
    );

SELECT
    contract_id
FROM
    @IdentityOutput 
FOR JSON PATH
`;
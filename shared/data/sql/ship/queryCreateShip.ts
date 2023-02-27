export let queryCreateShip = `
DECLARE @IdentityOutput TABLE(ship_id uniqueidentifier);

INSERT INTO
    [ships](
		[name],
        [code],
        [updated_by]
    ) OUTPUT inserted.id INTO @IdentityOutput
VALUES
    (
		@ship_name,
        @ship_code,
        @updated_by
    );

SELECT
    ship_id
FROM
    @IdentityOutput
FOR JSON PATH
    `;
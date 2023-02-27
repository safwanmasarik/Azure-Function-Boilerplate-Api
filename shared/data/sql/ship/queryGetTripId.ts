export let queryGetTripId = `
SELECT 
    trip_id
FROM
    olv.fact_voyage_feedback
WHERE
    voyage_feedback_id = @voyage_feedback_id
FOR JSON PATH
`;

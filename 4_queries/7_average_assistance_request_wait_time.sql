/*
Calculate the average time it takes to start an assistance request.
*/

SELECT avg(started_at - created_at) as average_wait_time
FROM assistance_requests 
LIMIT 1;
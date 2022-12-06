/*
The same query as 1_assignments_per_day:
------------------------------------------
SELECT day, count(*) as total_assignments 
FROM assignments
GROUP BY day
ORDER BY day;
-------------------------------------------

but only return rows where total assignments is greater than or equal to 10.
*/

SELECT day, count(*) as total_assignments 
FROM assignments
GROUP BY day
HAVING count(*) >= 10
ORDER BY day;
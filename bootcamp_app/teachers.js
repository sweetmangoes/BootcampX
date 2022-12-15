const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cohortName}'
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
  console.log(res)
})
.catch(e => console.error(e.stack))


// pool.query(`
// SELECT teachers.name as teacher, students.name as student, 
// assignments.name as assignment, (completed_at-started_at) as duration
// FROM assistance_requests
// JOIN teachers ON teachers.id = teacher_id
// JOIN students ON students.id = student_id
// JOIN assignments ON assignments.id = assignment_id
// ORDER BY duration;
// `)
// .then(res => {
//   console.log(res.rows);

// })
// .catch(err => console.error('query erorr', err.stack)); 

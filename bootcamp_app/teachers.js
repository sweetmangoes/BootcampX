const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});


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
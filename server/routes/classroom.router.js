const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

const sampleClassrooms = [
    {id: 1, classroom_name: 'Physical Science Hour 1', person_id: 1}, 
    {id: 2, classroom_name: 'Engineering Hour 2', person_id: 1},
    {id: 3, classroom_name: 'Life Science Hour 3', person_id: 1},
    {id: 4, classroom_name: 'Physical Science Hour 4', person_id: 1},
]

const sampleAssignments = [
    {id: 1, assignment_name: 'Egg Drop', classroom_id: 1},
    {id: 2, assignment_name: 'PS Summative 1', classroom_id: 1},
    {id: 3, assignment_name: 'Solar Oven', classroom_id: 1},
    {id: 4, assignment_name: 'Roller Coaster Lab', classroom_id: 2},
    {id: 5, assignment_name: 'Marshmallow Tower', classroom_id: 2},
]

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('classroom req.body:', req.body, 'classroom req.user:', req.user);
    queryText = `SELECT * FROM "classrooms" WHERE "person_id" = $1;`
    pool.query(queryText, [req.user.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('Error on /api/classroom GET:', error)
            res.sendStatus(500);
        });
});

router.get('/assignments/:id', rejectUnauthenticated, (req, res) => {
    console.log('/assignments req.body:', req.body, '/assignments req.user:', req.user, 'assignment req.params:', req.params);
    queryText = `SELECT * FROM "assignments" WHERE "classroom_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('Error on /api/classroom/assignment GET:', error)
            res.sendStatus(500);
        });
})

module.exports = router;
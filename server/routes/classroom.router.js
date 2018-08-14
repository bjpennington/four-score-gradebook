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

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('new classroom post req.body:', req.body, 'new classroom req.user:', req.user);
    queryText = `INSERT INTO "classrooms" ("classroom_name", "person_id") VALUES ($1, $2) RETURNING "id", "classroom_name";`
    pool.query(queryText, [req.body.classroom_name, req.user.id])
        .then(response => {
            console.log(response);
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/classroom POST:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log(' classroom to edit req.body:', req.body, 'classroom to edit req.user:', req.user);
    queryText = `UPDATE "classrooms" SET "classroom_name" = $1 WHERE "id" = $2;`
    pool.query(queryText, [req.body.classroom_name, req.body.id])
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/classroom PUT:', error);
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
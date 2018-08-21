const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "students" ("student_name", "classroom_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.newStudent, req.body.classroom_id])
        .then(response => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error on /api/student POST:', error);
            res.sendStatus(500);
        });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "students" WHERE "classroom_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('Error on /api/student GET:', error)
            res.sendStatus(500);
        });
});

router.get('/assignment/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT DISTINCT "scores"."student_id", "students"."student_name" FROM "scores"
                    JOIN "students" ON "scores"."student_id" = "students"."id"
                    WHERE "scores"."assignment_id" = $1
                    ORDER BY "students"."student_name";`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error on /api/student/assignment GET:', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `DELETE FROM "students" WHERE "id" = $1 RETURNING "classroom_id";`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/student DELETE:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
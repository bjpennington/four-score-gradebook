const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "classrooms" WHERE "person_id" = $1
                    ORDER BY "id";`
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
    queryText = `INSERT INTO "classrooms" ("classroom_name", "person_id") VALUES ($1, $2) RETURNING "id", "classroom_name";`
    pool.query(queryText, [req.body.classroom_name, req.user.id])
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/classroom POST:', error);
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    queryText = `UPDATE "classrooms" SET "classroom_name" = $1 WHERE "id" = $2 RETURNING *;`
    pool.query(queryText, [req.body.classroom_name, req.body.id])
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/classroom PUT:', error);
            res.sendStatus(500);
        });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "classrooms" where "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error on /api/classrooms/:id GET:', error);
            res.sendStatus(500);
        });
});

router.get('/assignments/:id', rejectUnauthenticated, (req, res) => {
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
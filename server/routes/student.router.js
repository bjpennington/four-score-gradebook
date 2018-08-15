const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
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
    console.log('/students req.body:', req.body, '/students req.user:', req.user, 'students req.params:', req.params);
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
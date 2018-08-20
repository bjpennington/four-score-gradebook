const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "standards" ("standard_name", "classroom_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.newStandard, req.body.classroom_id])
        .then(response => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error on /api/standard POST:', error);
            res.sendStatus(500);
        });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "standards" WHERE "classroom_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('Error on /api/standard GET:', error)
            res.sendStatus(500);
        });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `DELETE FROM "standards" WHERE "id" = $1 RETURNING "classroom_id";`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('Error on /api/standard DELETE:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
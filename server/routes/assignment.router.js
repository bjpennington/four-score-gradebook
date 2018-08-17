const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "assignments" ("assignment_name", "classroom_id") VALUES ($1, $2) RETURNING "id";`;
    pool.query(queryText, [req.body.assignment_name, req.body.classroom_id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error on /api/assignment POST:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
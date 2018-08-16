const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "scores" WHERE "classroom_id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error on /api/score/:id GET:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
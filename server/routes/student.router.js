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

module.exports = router;
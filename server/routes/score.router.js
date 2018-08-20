const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
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

router.get('/assignment/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "scores"."id", "students"."student_name", "standards"."standard_name", "scores"."score" FROM "scores"
                    JOIN "standards" ON "scores"."standard_id" = "standards"."id"
                    JOIN "students" ON "scores"."student_id" = "students"."id"
                    WHERE "scores"."assignment_id" = $1
                    ORDER BY "students"."student_name";`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('Error on /api/score/assignment/:id GET:', error);
            res.sendStatus(500);
        });
});

router.post('/', rejectUnauthenticated, (req, res) => {
    let allScores = [];
    for (let student of req.body.studentsIds) {
        let assignmentForStandard = [];
        for (let standard of req.body.standardsIds) {
            assignmentForStandard = [...assignmentForStandard, [student, req.body.assignment_id, standard, req.body.classroom_id]]
        }
        allScores = [...allScores, ...assignmentForStandard]
    }
    let isPostError = false;
    queryText = `INSERT INTO "scores" ("student_id", "assignment_id", "standard_id", "classroom_id") VALUES ($1, $2, $3, $4);`
    for (let score of allScores) {
        pool.query(queryText, [score[0], score[1], score[2], score[3]])
            .then(response => { })
            .catch(error => {
                console.log('Error on /api/score POST:', error);
                isPostError = true;
            });
    }
    if (isPostError) { res.sendStatus(201) }
    else { res.sendStatus(500) }
});

module.exports = router;
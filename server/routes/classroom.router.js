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

router.get('/', rejectUnauthenticated, (req, res) => {
    res.send(sampleClassrooms);
});

module.exports = router;
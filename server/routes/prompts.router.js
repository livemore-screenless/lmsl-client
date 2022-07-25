const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')



router.get('/all-prompts', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
    SELECT * FROM prompts;
    `;

    pool.query(sqlQuery)
        .then(result => {
            console.log('question is', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all prompts', err);
            res.sendStatus(500);
        })
});

router.get('/:id/:videoId/reactions', rejectUnauthenticated, (req, res) => {
// get reactions to loop over and the reaction numbers for each
    const sqlQuery = `
    SELECT * FROM reactions;
    `;

    pool.query(sqlQuery)
        .then(result => {
            console.log('reactions are', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

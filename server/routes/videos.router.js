const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')



router.get('/:id/all-videos', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
    SELECT 
    "video-responses".id,
    "video-responses".video_url,
    "user".username
    FROM "video-responses"
    JOIN "user"
    ON "video-responses".user_id = "user".id
    WHERE "prompt_id" = $1;
    `;

    pool.query(sqlQuery, [req.params.id])
        .then(result => {
            console.log('question is', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
})


module.exports = router;

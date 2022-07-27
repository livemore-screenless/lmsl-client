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

router.get('/:id/:videoId/reaction-counts', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT 
    "video-reactions".reaction_id,
    COUNT("video-reactions".reaction_id)
    FROM "video-reactions"
    WHERE "video-reactions".video_response_id = $1
    GROUP BY "video-reactions".reaction_id;
        `;

    pool.query(sqlQuery, [req.params.videoId])
        .then(result => {
            console.log('reaction counts are', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

router.post('/:id/:videoId/:buttonId/new-reaction', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
    INSERT INTO "video-reactions" ("video_response_id", "user_id", "reaction_id")
    VALUES ($1, $2, $3)
    RETURNING *;
        `;

    const queryParams = [
        req.params.videoId,
        req.user.id,
        req.params.buttonId
    ]

    pool.query(sqlQuery, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

router.put('/update-reaction', rejectUnauthenticated, (req, res) => {
    // get reactions to loop over and the reaction numbers for each
    const sqlQuery = `
    UPDATE reactions 
    SET reaction = $1
    WHERE id = $2;
    `;

    const sqlParams = [req.body.newReaction, req.body.reactionId]
    
    pool.query(sqlQuery, sqlParams)
        .then(result => {
            console.log('reactions are', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

module.exports = router;

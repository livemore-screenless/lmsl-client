const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')



router.get('/all-videos', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
      SELECT 
      "video-responses".id,
      "video-responses".video_url,
      "user".username,
      "prompts".question,
      "prompts".id AS prompt_id
      FROM "video-responses"
      JOIN "user"
      ON "video-responses".user_id = "user".id
      JOIN prompts
      ON "video-responses".prompt_id = prompts.id
      AND "video-responses".approved = TRUE;
    `;

    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

/** GET route for specific video on page load for that prompt
 */
router.get('/:id/:videoId/video-item', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `
      SELECT 
      "video-responses".id,
      "video-responses".video_url,
      "user".username,
      prompts.question
      FROM "video-responses"
      JOIN "user"
      ON "video-responses".user_id = "user".id
      JOIN prompts
      ON "video-responses".prompt_id = prompts.id
      WHERE "video-responses".id = $1;
    `;

    pool.query(sqlQuery, [req.params.videoId])
        .then(result => {
            console.log('question is', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error in getting all videos', err);
            res.sendStatus(500);
        })
});

/**
 * GET route for my-videos page
 */
 router.get('/my-videos', (req, res) => {
    console.log('made it to the get route')
    const sqlQuery = `
      SELECT *
      FROM "video-responses"
      JOIN "prompts" ON "prompts"."id"="video-responses"."prompt_id"
      WHERE USER_ID = $1;
    `;
    pool.query(sqlQuery, [req.user.id])
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: GET videos', err);
        res.sendStatus(500)
      })
  });

/**
 * GET route for review-submissions page
 */
  router.get('/video-responses', (req, res) => {
    console.log('made it to the get route')
    const sqlQuery = `
    SELECT "video-responses".id, "video-responses".video_url, "user".username, "prompts".question
    FROM "video-responses"
    JOIN "prompts" ON "prompts"."id"="video-responses"."prompt_id"
    JOIN "user" ON "user"."id"="video-responses"."user_id"
    WHERE APPROVED IS NULL;
    `;
    pool.query(sqlQuery)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: GET videos', err);
        res.sendStatus(500)
      })
  });

// update video to approved
router.put('/approve/:id', (req, res) => {
  const  id  = req.params.id;
  console.log('put request for id', id);
  let sqlQuery = `
    UPDATE "video-responses" 
    SET APPROVED = true
    WHERE "id" = $1;
  `;
  const sqlParams = [id];
  pool.query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(204);
    }).catch( (error) => {
      res.sendStatus(500); 
    })
})

// update video to denied
router.put('/deny/:id', (req, res) => {
  const  id  = req.params.id;
  console.log('put request for id', id);
  let sqlQuery = `
    UPDATE "video-responses" 
    SET APPROVED = false
    WHERE "id" = $1;
  `;
  const sqlParams = [id];
  pool.query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(204);
    }).catch( (error) => {
      res.sendStatus(500); 
    })
})

module.exports = router;

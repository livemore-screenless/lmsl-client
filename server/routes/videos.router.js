const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
      SELECT * FROM "video-responses"
      WHERE APPROVED IS NULL
      ORDER BY id desc;
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
router.put('/:id', (req, res) => {
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



/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

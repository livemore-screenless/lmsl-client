const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for my-videos page
 */
 router.get('/my-videos', (req, res) => {
    console.log('made it to the get route')
    const sqlQuery = `
      SELECT * FROM "video-responses"
      WHERE USER_ID = $1
      ORDER BY id asc;
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
      ORDER BY id asc;
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







/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

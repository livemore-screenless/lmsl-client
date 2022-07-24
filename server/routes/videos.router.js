const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/', (req, res) => {
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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

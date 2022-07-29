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

router.get('/all/reactions', rejectUnauthenticated, (req, res) => {
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

router.get('/:id/reaction', rejectUnauthenticated, (req, res) => {
    // get reactions to loop over and the reaction numbers for each
    const sqlQuery = `
    SELECT * FROM reactions
    WHERE id = $1;
    `;
    
    const queryParams = [req.params.id]

    pool.query(sqlQuery, queryParams)
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

//Grabbing the prompts from DB to EDIT them
router.get("/:id", rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
      const sqlQuery = `
    SELECT *
    FROM "prompts"
    WHERE id = $1
    `;
      //putting it in a bracket to nicely package the items
      const sqlParams = [req.params.id];
      pool
        .query(sqlQuery, sqlParams)
        .then((dbRes) => {
          // if there isn't anything to change, you get a 404
          if (dbRes.rows.length === 0) {
            res.sendStatus(404);
          } else {
            // this sends the 1 item when you put the [0]
            res.send(dbRes.rows[0]);
          }
        })
        .catch((err) => {
          console.log("Err in GET BY ID", err);
          res.sendStatus(500);
        });
    }
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
router.post( '/', rejectUnauthenticated, ( req, res )=>{
    console.log( 'in POST', req.body );
    let sqlPost = `INSERT INTO "prompts" (question) VALUES ( $1 )`
    pool.query( sqlPost, [ req.body.question]).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( 'error in POSTING FEEDBACK',error );
        
    })
  });
  

router.put('/update-reaction', rejectUnauthenticated, (req, res) => {
    // get reactions to loop over and the reaction numbers for each
    const sqlQuery = `
    UPDATE reactions 
    SET reaction = $1
    WHERE id = $2;
    `;

    const sqlParams = [req.body.reaction, req.body.id]

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


router.put("/:id/archived",rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log("put request for id", id);
    let sqlQuery = `
      UPDATE "prompts" 
      SET "archived" = $1
      WHERE "id" = $2;
    `;
    const sqlParams = [true, id];
    pool
      .query(sqlQuery, sqlParams)
      .then(() => {
        console.log('prompts that have been set are ')
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('ERROR IN PUT')
        res.sendStatus(500);
      });
  });
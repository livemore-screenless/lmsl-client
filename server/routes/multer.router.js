const express = require('express');
require('dotenv').config()
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require ('../modules/authentication-middleware')

const { S3Client } = require('@aws-sdk/client-s3')
const s3Uploadv2 = require('../s3Service/s3Service')
const s3 = new S3Client()
const multerS3 = require('multer-s3')
const multer = require("multer");

//install uuid which allows for unique identifier for file names
const uuid = require("uuid").v4
//this is setting up how you name the files for uploading
const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  key: function (req, file, cb) {
    cb(null, `uploads/${uuid()}-${file.originalname}`)
  }
  
})
// you would pass in fileFilter after storage if you wanted to filter by certain file types
// uuid-originalname
// pass in 'storage'                limits this makes it whatever byte limit you set as / and only 1 file
const upload = multer({ storage, 
  limits: {
    fileSize: 1024 * 1024 *1024,
     files: 1
    } 
  });
            //wants to use multer here and then run all the code in here
router.post("/:id", rejectUnauthenticated, upload.array("file"), async (req, res) => {
  // console.log('this is the post endpoint', req.files[0])
  // console.log('req.params', req.params)
  try{
    //this is the url exactly that it's sending
    const file = req.files[0].location
    //console.log('this is res.files', req.files[0])
    const sqlQuery = `
    INSERT INTO "video-responses"
    (prompt_id, user_id, video_url)
    VALUES ($1, $2, $3);
    `
    const sqlParams = [
      req.params.id,
      req.user.id,
      req.files[0].location
    ]
    let dbResult = await pool.query(sqlQuery, sqlParams)
              //can only send headers once
    res.send(dbResult)
    }
      catch(error) {
      console.log(error)
      res.sendStatus(500);
    }
});

module.exports = router;
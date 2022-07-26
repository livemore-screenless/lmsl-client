const express = require('express');
const s3Uploadv2 = require('../s3Service/s3Service')
require('dotenv').config()
const pool = require('../modules/pool');
const router = express.Router();





const multer = require("multer");
//install uuid which allows for unique identifier for file names
const uuid = require("uuid").v4
//store the file in memory and then you pass it into 'upload' down below
const storage = multer.memoryStorage()


// you would pass in fileFilter after storage if you wanted to filter by certain file types
// uuid-originalname
// pass in 'storage'                limits this makes it whatever byte limit you set as / and only 1 file
const upload = multer({ storage, limits: {fileSize: 1000000000, files: 1} });
router.post("/", upload.array("file"), async (req, res) => {
  console.log('this is the post endpoint', req.files[0])
  try{
    const file = req.files[0]
    const result = await s3Uploadv2(file);
    //result.location and res.send it 
  res.send(result)
}
catch(error) {
  console.log(error)
  res.sendStatus(500);
}
});

module.exports = router;
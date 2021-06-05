require("dotenv").config();
const express = require("express");
const router = express.Router();
const ibm = require('ibm-cos-sdk');
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Video = require("../models/video");


var config = {
    endpoint: process.env.IBM_ENDPOINT,
    apiKeyId:process.env.IBM_API_KEYID,
    serviceInstanceId: process.env.IBM_SERVICE_INSTANCE_ID,
};

var cos = new ibm.S3(config);

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback("", null);
  },
});

var upload = multer({ storage: storage }).fields([
  { name: "videoFile", maxCount: 1 },
  { name: "posterImage", maxCount: 1 },
]);

router.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const filesToUpload = [];
    Object.keys(req.files).forEach((key) => {
      const file = req.files[key][0];
      const id = uuidv4();
      const fileName = `${id}.${file["originalname"].split(".")[1]}`;
      const fileObj = {
        name: fileName,
        buffer: file.buffer,
        size: file.size,
        mimetype: file.mimetype,
        encoding: file.encoding,
        fieldname: file.fieldname,
      };
      filesToUpload.push(fileObj);
    });
    let videoFileLocation = "";
    let imageFileLocation = "";
    filesToUpload.forEach(async (file, index) => {
        console.log("Here====\n",file.name);
        cos.putObject({
            Bucket: process.env.IBM_BUCKET_NAME,
            Key: file.name,
            Body: file.buffer
        }).promise().then(resp => {
            console.log(resp)
        });
        // console.log(response);
    });
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Video = require("../models/video");

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback("", null);
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

var upload = multer({ storage: storage }).fields([
  { name: "videoFile", maxCount: 1 },
  { name: "posterImage", maxCount: 1 },
]);

router.post("/upload", (req, res) => {
  upload(req, res, async function (err) {
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
    filesToUpload.forEach((file, index) => {
      // console.log(file);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: file.buffer,
      };

      s3.upload(params, (err, data) => {
        if (err) throw err;
        // console.log(data);
        if (file["fieldname"] === "videoFile") {
          videoFileLocation = data["Location"];
        } else {
          imageFileLocation = data["Location"];
        }
        // console.log(imageFileLocation, videoFileLocation);
        if (imageFileLocation && videoFileLocation) {
          const newVideo = new Video({
            name: req.body.name,
            synopsis: req.body.synopsis,
            year: req.body.year,
            directors: req.body.director,
            producers: req.body.producers,
            actors: req.body.actors,
            region: req.body.region,
            language: req.body.language,
            videoFilePath: videoFileLocation,
            posterFilePath: imageFileLocation,
          });

          newVideo
            .save()
            .then((videoData) => {
              return res.status(200).send(videoData);
            })
            .catch((err) => {
              console.log("Error in saving the file", err);
            });
        }
      });
    });
  });
});

// router.get("/uploads", async (req, res) => {
//   const videos = await Video.find({});
//   res.status(200).json(videos);
// });

module.exports = router;

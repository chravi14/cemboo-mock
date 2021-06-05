require("dotenv").config();
const express = require("express");
const router = express.Router();
const { format } = require("util");
// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const Video = require("../models/video");

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback("", null);
  },
});

// Creates a client from a Google service account key
const gStorage = new Storage({ keyFilename: "./cemboo-0489505ea5ba.json" });
const bucket = gStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

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
      const blob = bucket.file(file.name);
      const blobStream = blob.createWriteStream();
      blobStream.on("error", (err) => {
        console.log(err);
      });

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        if (file["fieldname"] === "videoFile") {
          videoFileLocation = publicUrl;
        } else {
          imageFileLocation = publicUrl;
        }
        console.log(imageFileLocation, videoFileLocation);
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
      blobStream.end(file.buffer);
    });
  });
});

module.exports = router;

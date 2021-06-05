require("dotenv").config();
const express = require("express");
const router = express.Router();
const { BlobServiceClient } = require('@azure/storage-blob');
const containerName = "uploads";
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Video = require("../models/video");

// Creating the Blob Container
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
const AZURE_STORAGE_URL = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_CONTAINER_NAME}`;


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
    filesToUpload.forEach((file, index) => {
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        blockBlobClient.uploadData(file.buffer, {blobHTTPHeaders: {
            blobContentType: file.mimetype
        }}).then(response => {
            if (file["fieldname"] === "videoFile") {
                videoFileLocation = `${AZURE_STORAGE_URL}/${file.name}`;
              } else {
                imageFileLocation = `${AZURE_STORAGE_URL}/${file.name}`;
              }
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
        }).catch(err => {
            console.log(err)
        })
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");
const Video = require("./../models/video");
const config = require("../config/config");
const awsUploader = require("./awsUpload");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "_" + Date.now() + path.extname(file.originalname));
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

    const newVideo = new Video({
      name: req.body.name,
      synopsis: req.body.synopsis,
      year: req.body.year,
      directors: req.body.director,
      producers: req.body.producers,
      actors: req.body.actors,
      region: req.body.region,
      language: req.body.language,
      videoFilePath: encodeURI(
        config.API_BASE_URL + req.files["videoFile"][0].filename
      ),
      posterFilePath: encodeURI(
        config.API_BASE_URL + req.files["posterImage"][0].filename
      ),
    });

    newVideo
      .save()
      .then((videoData) => {
        return res.status(200).send(videoData);
      })
      .catch((err) => {
        console.log("Error in saving the file", err);
      });
  });
});

router.post("/cloud", async (req, res) => {
  console.log(req.body);
  const { uploadTo } = req.body;
  console.log("Here", uploadTo);
  if (uploadTo === "aws") {
    const { imageFileLocation, videoFileLocation } = await awsUploader(
      req,
      res
    );
    console.log(imageFileLocation, videoFileLocation);
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

router.get("/uploads", async (req, res) => {
  const videos = await Video.find({});
  res.status(200).json(videos);
});

module.exports = router;

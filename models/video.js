const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  synopsis: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  directors: {
    type: String,
    require: true,
  },
  producers: {
    type: String,
    require: true,
  },
  actors: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  videoFilePath: {
    type: String,
    require: true,
  },
  posterFilePath: {
    type: String,
    require: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("video", videoSchema);

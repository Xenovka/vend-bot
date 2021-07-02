const mongoose = require("mongoose");

const stringRequired = {
  type: String,
  required: true
};

const songSchema = new mongoose.Schema({
  guildId: stringRequired,
  songTitle: stringRequired,
  songURL: stringRequired,
  songDuration: stringRequired,
  author: stringRequired
});

module.exports = mongoose.model("song-data", songSchema);

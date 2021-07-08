const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");

const stringRequired = {
  type: String,
  required: true
};

const songSchema = new mongoose.Schema({
  guildId: stringRequired,
  songTitle: stringRequired,
  songURL: stringRequired,
  songDuration: stringRequired,
  author: stringRequired,
  nowPlaying: {
    type: Boolean,
    required: true
  },
  queueNumber: {
    type: Number,
    required: true
  }
});

songSchema.plugin(mongoosePagination);

module.exports = mongoose.model("song-data", songSchema);

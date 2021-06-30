const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  serverPrefix: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("server-prefix", prefixSchema);

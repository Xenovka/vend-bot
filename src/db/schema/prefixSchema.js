const mongoose = require("mongoose");
const { Schema } = mongoose;

const prefixSchema = new Schema({
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

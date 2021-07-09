const mongoose = require("mongoose");

const stringRequired = {
  type: String,
  required: true
};

const numberDefault = {
  type: Number,
  default: 0
};

const userSchema = new mongoose.Schema({
  guildId: stringRequired,
  userId: stringRequired,
  coins: numberDefault,
  xp: numberDefault,
  level: numberDefault
});

module.exports = mongoose.model("user-profile", userSchema);

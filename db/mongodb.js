const mongoose = require("mongoose");

const { MONGODB_URL } = require("../config/config.json");

module.exports = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return mongoose;
};

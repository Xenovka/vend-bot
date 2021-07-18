const express = require("express");
const app = express();

app.all("/", (req, res) => {
  res.send("Connected to Server!");
});

const keepAlive = () => {
  app.listen(process.env.PORT, () => {
    console.log("Bot Ready!");
  });
};

module.exports = keepAlive;

const express = require("express");
const app = express();

app.all("/", (req, res) => {
  res.send("Connected to Server!");
});

app.listen(process.env.PORT, () => {
  console.log("Bot Ready!");
});

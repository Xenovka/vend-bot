const ytdl = require("ytdl-core");
const mongodb = require("../db/mongodb");
const songSchema = require("../db/schema/songSchema");

const songPlayer = async (channel, guildId, song, connection) => {
  await connection.voice.setSelfDeaf(true);

  if (!song) {
    await mongodb().then(async () => {
      try {
        await songSchema.deleteMany({ guildId });
      } catch (err) {
        console.log(err);
      }
    });
    connection.disconnect();
    return channel.send("Queue is empty now. Bye-bye.");
  }

  await mongodb().then(async () => {
    try {
      await songSchema.findOneAndUpdate(
        { songTitle: song.songTitle },
        { $set: { nowPlaying: true } }
      );
    } catch (err) {
      console.log(err);
    }
  });

  connection
    .play(ytdl(song.songURL, { filter: "audioonly" }))
    .on("finish", async () => {
      await mongodb().then(async () => {
        try {
          await songSchema.findOneAndRemove({ songTitle: song.songTitle });
          const nextSong = await songSchema.findOne({ nowPlaying: false });
          songPlayer(channel, guildId, nextSong, connection);
        } catch (err) {
          console.log(err);
        }
      });
    });
};

module.exports = songPlayer;

const ytdl = require("ytdl-core");
const mongodb = require("../db/mongodb");
const songSchema = require("../db/schema/songSchema");

const songPlayer = async (channel, guildId, song, connection) => {
  await connection.voice.setSelfDeaf(true);

  if (!song) {
    await mongodb().then(async (mongoose) => {
      try {
        await songSchema.deleteMany({ guildId });
      } finally {
        mongoose.connection.close();
      }
    });
    connection.disconnect();
    return channel.send("Queue is empty now. Bye-bye.");
  }

  await mongodb().then(async (mongoose) => {
    try {
      await songSchema.findOneAndUpdate(
        { songTitle: song.songTitle },
        { $set: { nowPlaying: true } }
      );
    } finally {
      mongoose.connection.close();
    }
  });

  connection
    .play(ytdl(song.songURL, { filter: "audioonly" }))
    .on("finish", async () => {
      await mongodb().then(async (mongoose) => {
        try {
          await songSchema.findOneAndRemove({ songTitle: song.songTitle });
          const nextSong = await songSchema.findOne({ nowPlaying: false });
          songPlayer(channel, guildId, nextSong, connection);
        } finally {
          mongoose.connection.close();
        }
      });
    });
};

module.exports = songPlayer;

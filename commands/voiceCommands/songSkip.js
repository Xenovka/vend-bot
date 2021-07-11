const ytdl = require("ytdl-core");
const mongodb = require("../../db/mongodb");
const songSchema = require("../../db/schema/songSchema");
const songPlayer = require("../../utils/songPlayer");

module.exports = {
  commands: ["skip", "s"],
  cooldown: 10,
  callback: async ({ message }) => {
    const { channel, guild, member } = message;

    const guildId = guild.id;
    const connection = await member.voice.channel.join();

    if (member.voice.channel) {
      await mongodb().then(async () => {
        try {
          const songs = await songSchema.findOneAndRemove({ nowPlaying: true });
          let index = songs.queueNumber;
          const isLastSong = await songSchema
            .countDocuments({ guildId })
            .exec();

          if (!isLastSong) {
            return channel.send("Already at the end of the queue!");
          }

          if (!songs) {
            return channel.send("Empty Queue!");
          }

          // Set the next song to be played
          const updated = await songSchema.findOneAndUpdate(
            { queueNumber: index + 1 },
            { $set: { nowPlaying: true } }
          );
          songPlayer(channel, guildId, updated, connection);
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      message.reply("You must be in the voice channel to use this command!");
      return;
    }
  }
};

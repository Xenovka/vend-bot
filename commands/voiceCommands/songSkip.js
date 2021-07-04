const ytdl = require("ytdl-core")
const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")

module.exports = {
  commands: ['skip', 's'],
  callback: async (message, arguments, argsText) => {
    const {channel, member} = message

    if(member.voice.channel) {
      await mongodb().then(async mongoose => {
        try {
          const songs = await songSchema.findOneAndRemove({nowPlaying: true})
          const index = songs.queueNumber;
  
          if(!index) {
            return channel.send('Already at the end of the queue!')
          }
  
          if(!songs) {
            return channel.send('Empty Queue!')
          }
  
          // Set the next song to be played
          const updated = await songSchema.findOneAndUpdate({queueNumber: index + 1}, {$set: {nowPlaying: true}}) 
          await member.voice.channel.join().then(connection => {
            connection.play(ytdl(updated.songURL, {filter: 'audioonly'}), {volume: 0.5})
          })
  
        } finally {
          mongoose.connection.close()
        }
      })
    } else {
      message.reply(
        "You must be in the voice channel to use this command!"
      );
      return
    }

    
  }
}
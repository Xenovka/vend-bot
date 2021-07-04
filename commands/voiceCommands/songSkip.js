const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")

module.exports = {
  commands: ['skip', 's'],
  callback: async (message, arguments, argsText) => {
    const {channel, member} = message

    if(member.voice.channel) {
      await mongodb().then(async mongoose => {
        try {
          const songs = await songSchema.findOneAndUpdate({nowPlaying: true}, {$set: {nowPlaying: false}})
          const index = songs.queueNumber;
  
          if(!index) {
            return channel.send('Already at the end of the queue!')
          }
  
          if(!songs) {
            return channel.send('Empty Queue!')
          }
  
          await songSchema.findOneAndUpdate({queueNumber: index + 1}, {$set: {nowPlaying: true}}) // Set the next song to be played
  
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
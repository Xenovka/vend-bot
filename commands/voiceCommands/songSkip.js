const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")

module.exports = {
  commands: ['skip', 's'],
  callback: async (message, arguments, argsText) => {
    const {channel, member} = message

    await mongodb().then(async mongoose => {
      try {
        const songs = await songSchema.findOne({nowPlaying: true})

        if(!songs) {
          return channel.send('Empty Queue!')
        }

        console.log(songs)

      } finally {
        mongoose.connection.close()
      }
    })
  }
}
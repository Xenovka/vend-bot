
const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")

module.exports = {
  commands: 'queue',
  callback: async (message, arguments, argsText) => {
    const {guild, channel} = message

    const guildId = guild.id

    await mongodb().then(async mongoose => {
      try {
        const documentLength = await songSchema.countDocuments({guildId}).exec()
        const songs = []

        for (let i = 0; i < documentLength; i++) {
          const foundDoc = await songSchema.findOne({queueNumber: i + 1})
          songs.push([foundDoc])
        }
        
        if (!documentLength) {
          return channel.send('Queue is empty!')
        }
        
        let queueMessage = "```elm\n"

        for(let i = 0; i < documentLength; i++) {
          let title = songs[i][0].songTitle
          if (title.length >= 50) {
            title = title.slice(0, 50) + '...'
          } else {
            title += ' '.repeat(53 - title.length)
          }
          
          queueMessage += `${songs[i][0].queueNumber}) ${title} ${songs[i][0].songDuration}\n`
        }

        channel.send(queueMessage + "```")

      } finally {
        mongoose.connection.close()
      }
    })
  }
}
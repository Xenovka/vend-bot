const { MessageEmbed } = require("discord.js")
const yts = require("yt-search")
const ytdl = require("ytdl-core")
const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")

let queue = new Map()

module.exports = {
  commands: 'play',
  expectedArgs: '[songTitle]',
  minArgs: 1,
  maxArgs: 20,
  callback: async (message, arguments, argsText) => {

    const {channel, author, member} = message
    
    const guildId = message.guild.id
    const search = await yts(argsText)
    const searchResult = search.videos[0]
    const songURL = searchResult.url
    const songTitle = searchResult.title
    const songDuration = searchResult.timestamp

    const serverQueue = queue.get(guildId)

    if (member.voice.channel) {
      await mongodb().then(async mongoose => {
        try {
          await new songSchema({
            guildId,
            songTitle,
            songURL,
            songDuration,
            author
          }).save()
        } finally {
          mongoose.connection.close()
        }
      })

      if(!serverQueue) {
        await mongodb().then(async mongoose => {
          const songList = {
            songs: [],
            connection: null
          }

          try {
            const findSong = await songSchema.findOne({songTitle})
    
            queue.set(guildId, songList)
            songList.songs.push(findSong)

            const connect = await member.voice.channel.join()
            songList.connection = connect
            songPlayer(channel, guildId, songList.songs[0])

            const embeds = new MessageEmbed()
              .setColor('ORANGE')
              .setDescription(`Playing [${songTitle}](${songURL}) By <@${author.id}>`)

            return channel.send(embeds)

          } finally {
            mongoose.connection.close()
          }
        })
      } else {
        await mongodb().then(async mongoose => {
          try {
            const findSong = await songSchema.findOne({songTitle}) 
            serverQueue.songs.push(findSong)
            console.log(serverQueue);

            const embeds = new MessageEmbed()
                  .setColor("ORANGE")
                  .setDescription(`Queued [${songTitle}](${songURL}) By <@${author.id}>`)

            return channel.send(embeds)
          } finally {
            mongoose.connection.close()
          }
        })
      }
    } else {
      message.reply(
        "You must be in the voice channel before u tell me to join!"
      );
      return
    }

  }
}

const songPlayer = async (channel, guildId, song) => {
  const songQueue = queue.get(guildId)

  await songQueue.connection.voice.setSelfDeaf(true)

  if(!song) {
    songQueue.connection.disconnect()
    queue.delete(guildId)
    
    await mongodb().then(async mongoose => {
      try {
        await songSchema.deleteMany({guildId})
      } finally {
        mongoose.connection.close()
      }
    })

    return channel.send('Queue is empty now. Bye-bye.')
  }

  songQueue.connection.play(ytdl(song.songURL, {filter: 'audioonly'}), {volume: 0.5})
    .on('finish', () => {
      songQueue.songs.shift()
      songPlayer(channel, guildId, songQueue.songs[0])
    })
}
const { MessageEmbed } = require("discord.js")
const yts = require("yt-search")
const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")
const songPlayer = require('../../utils/songPlayer')

module.exports = {
  commands: ['play', 'p'],
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

    if (member.voice.channel) {
      let countDocs;
      await mongodb().then(async () => {
        try {
          countDocs = await songSchema.countDocuments({guildId}).exec()

          await new songSchema({
            guildId,
            songTitle,
            songURL,
            songDuration,
            author,
            nowPlaying: false,
            queueNumber: countDocs + 1
          }).save()
        } catch (err) {
          console.log(err);
        }
      })

      if(!countDocs) {
        await mongodb().then(async () => {
          try {
            const song = await songSchema.findOne({songTitle})

            const connection = await member.voice.channel.join()
            songPlayer(channel, guildId, song, connection)

            const embeds = new MessageEmbed()
              .setColor('ORANGE')
              .setDescription(`Playing [${songTitle}](${songURL}) By <@${author.id}>`)

            return channel.send(embeds)

          } catch (err) {
            console.log(err);
          }
        })
      } else {
        await mongodb().then(async () => {
          try {
            const embeds = new MessageEmbed()
                  .setColor("ORANGE")
                  .setDescription(`Queued [${songTitle}](${songURL}) By <@${author.id}>`)

            return channel.send(embeds)
          } catch (err) {
            console.log(err);
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
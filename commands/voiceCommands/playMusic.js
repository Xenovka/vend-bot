const { MessageEmbed } = require('discord.js')
const yts = require('yt-search')
const ytdl = require('ytdl-core')

module.exports = {
  commands: 'play',
  expectedArgs: '[songTitle]',
  minArgs: 1,
  maxArgs: 10,
  callback: async (message, arguments, argsText) => {
    const {guild, member, channel, author} = message

    if (!guild) return

    const search = await yts(argsText)
    const searchResult = search.videos[0]
    const songURL = searchResult.url
    const songTitle = searchResult.title

    if(member.voice.channel) {
        const connect = await member.voice.channel.join().then(async connection => {
          const deafen = await connection.voice.setSelfDeaf(true)
          const dispatcher = connection.play(ytdl(songURL, {filter: 'audioonly'}))
      })
      
    } else {
      message.reply(
        "You must be in the voice channel before u tell me to join!"
      );
      return
    }

    const embeds = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`Playing [${songTitle}](${songURL}) Requested By <@${author.id}>`)

    channel.send(embeds)
  }
}
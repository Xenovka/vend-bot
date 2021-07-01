const yts = require("yt-search")
const lyricsfinder = require('lyrics-finder')
const { MessageEmbed } = require("discord.js")

module.exports = {
  commands: ['lyrics', 'l'],
  expectedArgs: '[songTitle]',
  minArgs: 1,
  maxArgs: 20,
  callback: async (message, arguments, argsText) => { 
    const {channel} = message

    const search = await yts(argsText)
    const searchResult = search.videos[0]
    const songTitle = searchResult.title;
    const lyrics = await lyricsfinder(songTitle)

    if(!lyrics) {
      return message.reply("Sorry, we couldn't found the lyrics.")
    }
    
    const embeds = new MessageEmbed()
      .setColor('ORANGE')
      .setAuthor(songTitle)
      .setDescription(lyrics)
      .setFooter('Lyrics provided by lyrics-finder')
      .setTimestamp()

    channel.send(embeds)
  }
}
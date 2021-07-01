const { MessageEmbed } = require('discord.js')
const yts = require('yt-search')
const ytdl = require('ytdl-core')

let queue = new Map()

module.exports = {
  commands: 'play',
  expectedArgs: '[songTitle]',
  minArgs: 1,
  maxArgs: 10,
  callback: async (message, arguments, argsText, prefix, client) => {
    const {guild, member, channel, author} = message

    if (!guild) return

    const serverQueue = queue.get(guild.id)

    const search = await yts(argsText)
    const searchResult = search.videos[0]
    const songURL = searchResult.url
    const songTitle = searchResult.title
    const songDuration = searchResult.timestamp

    if(member.voice.channel) {        
        if(!serverQueue) {
          const musicList = {
            songs: [],
            connection: null
          }
          
          queue.set(guild.id, musicList)
          musicList.songs.push({songTitle, songURL, songDuration})

          try {
            const connect = await member.voice.channel.join()
            musicList.connection = connect
            songPlayer(channel, guild, musicList.songs[0])

            const embeds = new MessageEmbed()
              .setColor("ORANGE")
              .setDescription(`Playing [${songTitle}](${songURL}) By <@${author.id}>`)

            channel.send(embeds)
            

          } catch (err) {
            return channel.send('There was an error occured while trying to play the song!')
          }
        } else {
          serverQueue.songs.push({songTitle, songURL, songDuration})
          const embeds = new MessageEmbed()
              .setColor("ORANGE")
              .setDescription(`Queued [${songTitle}](${songURL}) By <@${author.id}>`)

          return channel.send(embeds)
        }

        client.on('message', msg => {
          const serverQueue = queue.get(msg.guild.id)
          if(msg.content === `${prefix}skip`) {
            skipSong(msg, serverQueue)
          }
        })
    } else {
      message.reply(
        "You must be in the voice channel before u tell me to join!"
      );
      return
    }
  }
}

const songPlayer = async (channel, guild, song) =>{ 
  const songQueue = queue.get(guild.id)
  
  await songQueue.connection.voice.setSelfDeaf(true) // bot self deafen

  if(!song) {
    songQueue.connection.leave()
    queue.delete(guild.id)
    return channel.send('Queue is empty now. Bye-bye.')
  }

  songQueue.connection.play(ytdl(song.songURL, {filter: 'audioonly'}), {volume: 0.5})
    .on('finish', () => {
      songQueue.songs.shift()
      songPlayer(channel, guild, songQueue.songs[0])
    })
}

const skipSong = (message, queue) => {
  const { member, channel } = message

  if(!member.voice.channel) return message.reply("You must be in the voice channel before u tell me to join!");
  if(!queue) return channel.send('Queue is empty')

  queue.connection.dispatcher.end()
}
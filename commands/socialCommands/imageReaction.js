const axios = require("axios").default
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['angry', 'happy', 'dance', 'calm', 'confused', 'random', 'exercise', 'sad', 'no', 'yes', 'thinking', 'eat', 'smug'],
  cooldown: 10,
  callback: async (message, arguments, argsText, client, alias) => {
    const {channel, author} = message

    const reaction = alias;

    let description;

    switch(reaction) {
      case 'angry':
        description = `**${author.username}** is ANGRY.`
        getImageReaction(channel, reaction, description, 'RED')
        break;
      case 'happy':
        description = `**${author.username}** is Happy.`
        getImageReaction(channel, reaction, description, 'ORANGE')
        break;
      case 'dance':
        description = `**${author.username}** is Dancing.`
        getImageReaction(channel, reaction, description, 'AQUA')
        break;
      case 'calm':
        description = `**${author.username}** stays Calm.`
        getImageReaction(channel, 'calm-down', description, 'GREEN')
        break;
      case 'confused':
        description = `**${author.username}** was Confused.`
        getImageReaction(channel, reaction, description, 'GREY')
        break;
      case 'random':
        description = `random image for **${author.username}**.`
        getImageReaction(channel, 'misc', description, 'ORANGE')
        break;
      case 'exercise':
        description = `Goodluck with your exercise, **${author.username}**.`
        getImageReaction(channel, 'pre-exercise', description, 'YELLOW')
        break;
      case 'sad':
        description = `**${author.username}** is SAD.`
        getImageReaction(channel, reaction, description, 'DARK_BLUE')
        break;
      case 'no':
        description = `**${author.username}** says NO!.`
        getImageReaction(channel, reaction, description, 'DARK')
        break;
      case 'yes':
        description = `**${author.username}** says Yes.`
        getImageReaction(channel, reaction, description, 'AQUA')
        break;
      case 'thinking':
        description = `**${author.username}** is Thinking.`
        getImageReaction(channel, reaction, description, 'GREY')
        break;
      case 'eat':
        description = `**${author.username}** is Eating.`
        getImageReaction(channel, 'lunch-break-time', description, 'ORANGE')
        break;
      case 'smug':
        description = `**${author.username}** smug.`
        getImageReaction(channel, reaction, description, 'LIGHT_GREY')
        break;
    }
  }
}

const getImageReaction = async (channel, reaction, description, color) => {
  const response = await axios.get('https://anime-reactions.uzairashraf.dev/api/reactions/random', {
    params: {
      category: reaction
    }
  })

  const imageReactionResult = response.data.reaction

  const embeds = new MessageEmbed()
    .setDescription(description)
    .setImage(imageReactionResult)
    .setColor(color)
    .setFooter("anime-reaction-api by uzair-ashraf")
    .setTimestamp()

  channel.send(embeds)
}


const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: 'avatar',
  minArgs: 0,
  maxArgs: 1,
  callback: (message, arguments, argsText) => {
    const {author, channel, mentions, guild} = message

    const mentionedUser = mentions.users.first()

    if(!mentionedUser) {
      const embeds = new MessageEmbed()
        .setAuthor(`${author.username}'s avatar`)
        .setImage(author.avatarURL())
        .setFooter("Your avatar looks soo . . . .")
        .setTimestamp();

      channel.send(embeds);
      return
    }

    const embeds = new MessageEmbed()
      .setAuthor(`${mentionedUser.username}'s avatar`)
      .setImage(mentionedUser.avatarURL())
      .setFooter("Your avatar looks soo . . . .")
      .setTimestamp();

    channel.send(embeds);
    
  }

}


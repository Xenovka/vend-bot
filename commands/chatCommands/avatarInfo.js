const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: 'avatar',
  callback: (message, arguments, argsText) => {
    const {author, channel} = message

    const embed = new MessageEmbed()
      .setAuthor(`${author.username}'s avatar`)
      .setImage(author.avatarURL())
      .setFooter("Your avatar looks soo . . . .")
      .setTimestamp();

    channel.send(embed);
  }

}


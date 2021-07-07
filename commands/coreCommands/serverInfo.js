const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: 'server',
  callback: (message, arguments, argsText) => {
    const {guild, channel} = message

    const embeds = new MessageEmbed()
      .addFields(
        {
          name: "Server Name",
          value: guild.name,
          inline: false
        },
        {
          name: "Total Members",
          value: guild.memberCount,
          inline: false
        },
        {
          name: "Server Owner",
          value: guild.owner,
          inline: false
        }
      )
      .setThumbnail(guild.iconURL())
      .setFooter("showing server informations")
      .setColor("ORANGE")
      .setTimestamp();

    channel.send(embeds);
  }
}

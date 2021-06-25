const { MessageEmbed } = require("discord.js");

const { prefix } = require("../../config/config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content, channel, guild } = message;

    const embed = new MessageEmbed()
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

    const command = content.replace(prefix, "");
    if (command === "server") {
      channel.send(embed);
    }
  });
};

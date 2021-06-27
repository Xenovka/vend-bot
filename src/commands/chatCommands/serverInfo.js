const { MessageEmbed } = require("discord.js");

const commands = require("../commandHandler/commands");

module.exports = (client) => {
  commands(client, "server", (message) => {
    const { guild, channel } = message;

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
  });

  // const prefix = {};
  // await loadPrefix(client, prefix);

  // client.on("message", (message) => {
  //   const { content, channel, guild } = message;

  //   const embed = new MessageEmbed()
  //     .addFields(
  //       {
  //         name: "Server Name",
  //         value: guild.name,
  //         inline: false
  //       },
  //       {
  //         name: "Total Members",
  //         value: guild.memberCount,
  //         inline: false
  //       },
  //       {
  //         name: "Server Owner",
  //         value: guild.owner,
  //         inline: false
  //       }
  //     )
  //     .setThumbnail(guild.iconURL())
  //     .setFooter("showing server informations")
  //     .setColor("ORANGE")
  //     .setTimestamp();

  //   const command = content.replace(prefix[guild.id], "");
  //   if (command === "server") {
  //     channel.send(embed);
  //   }
  // });
};

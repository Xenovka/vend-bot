const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config/config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content, author, channel } = message;

    const embed = new MessageEmbed()
      .setAuthor(`${author.username}'s avatar`)
      .setImage(author.avatarURL())
      .setFooter("Your avatar looks soo . . . .")
      .setTimestamp();

    const command = content.replace(prefix, "");
    if (command === "avatar") {
      channel.send(embed);
    }
  });
};

const { MessageEmbed } = require("discord.js");
const { prefix: defaultPrefix } = require("../../config/config.json");
const { loadPrefix } = require("../../config/serverPrefix");

module.exports = async (client) => {
  const prefix = {};
  await loadPrefix(client, prefix);

  client.on("message", (message) => {
    const { content, author, channel } = message;

    const embed = new MessageEmbed()
      .setAuthor(`${author.username}'s avatar`)
      .setImage(author.avatarURL())
      .setFooter("Your avatar looks soo . . . .")
      .setTimestamp();

    const command = content.replace(prefix[message.guild.id], "");
    if (command == "avatar") {
      channel.send(embed);
    }
  });
};

const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config/config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content, channel } = message;

    const command = content.replace(prefix, "");
    if (command == "help") {
      const embed = new MessageEmbed()
        .setAuthor("💬 Available Commands")
        .setColor("ORANGE")
        .setFooter("hover over a commands for more info about that command!")
        .setURL("https://www.remote.tools/remote-work/discord-everyone-here")
        .setTimestamp()
        .setDescription(
          "to use a command, type `![command]`, if there's any bug on the command, tell the mod immediately. Other commands will added very soon!"
        )
        .addFields(
          {
            name: "Core Commands ⚙",
            value:
              "[`help`](https://discord.com/ 'Showing available commands') [`server`](https://discord.com/ 'Showing server info') [`invite`](https://discord.com/ 'Creating Server's invite link')",
            inline: true
          },
          {
            name: "Voice Commands 🎶",
            value:
              "[`dc`](https://discord.com 'Disconnecting the bot from the Voice Channel') [`join`](https://discord.com/ 'Telling the bot to join a Voice Channel')",
            inline: true
          },
          {
            name: "Socials 👀",
            value: "[`avatar`](https://discord.com/ 'Showing user's avatar')",
            inline: true
          }
        );

      channel.send(embed);
    }
  });
};

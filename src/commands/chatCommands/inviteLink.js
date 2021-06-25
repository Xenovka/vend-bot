const { prefix } = require("../../config/config.json");

module.exports = (client) => {
  client.on("message", async (message) => {
    const { content, guild, channel } = message;

    const command = content.replace(prefix, "");

    if (command == "invite") {
      const createInviteLink = await guild.fetchInvites().then((invites) => {
        let results = [];

        invites.forEach((invite) => {
          results.push(invite.code);
        });

        const createdInviteLink = `https://discord.gg/${
          results[results.length - 1]
        }`;

        channel.send(createdInviteLink);
      });
    }
  });
};

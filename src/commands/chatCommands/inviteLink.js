const { loadPrefix } = require("../../config/serverPrefix");

module.exports = async (client) => {
  const prefix = {};
  await loadPrefix(client, prefix);

  client.on("message", async (message) => {
    const { content, guild, channel } = message;

    const command = content.replace(prefix[guild.id], "");

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

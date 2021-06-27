const { loadPrefix } = require("../../config/serverPrefix");

module.exports = async (client, aliases, callback) => {
  const prefix = {};
  await loadPrefix(client, prefix);

  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  client.on("message", (message) => {
    const { content, guild } = message;

    aliases.forEach((alias) => {
      const command = `${prefix[guild.id]}${alias}`;

      if (content.startsWith(command) || content === command) {
        callback(message);
      }
    });
  });
};

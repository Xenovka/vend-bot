const { loadPrefix } = require("../../config/serverPrefix");
const mongodb = require("../../db/mongodb");
const prefixSchema = require("../../db/schema/prefixSchema");

module.exports = async (client) => {
  const prefix = {};
  await loadPrefix(client, prefix);

  client.on("message", async (message) => {
    const { content, guild, member } = message;

    const command = content.replace(prefix[guild.id], "");

    if (command === "prefix") {
      if (!member.hasPermission("ADMINISTRATOR")) {
        return message.reply(
          "You do not have permission to change bot prefix!"
        );
      }

      const newPrefix = command.split(" ");
      console.log(newPrefix);

      if (newPrefix[1]) {
        await mongodb().then(async (mongoose) => {
          try {
            await prefixSchema.findOneAndUpdate(guild.id, {
              serverPrefix: newPrefix
            });

            message.reply(
              `Prefix changed! now the bot prefix is '${newPrefix}'`
            );
          } finally {
            mongoose.connection.close();
          }
        });
      }

      return message.reply(
        "type '!prefix help' for more info how to use the command."
      );
    }
  });
};

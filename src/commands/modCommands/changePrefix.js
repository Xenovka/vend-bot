const { loadPrefix } = require("../../config/serverPrefix");
const mongodb = require("../../db/mongodb");
const prefixSchema = require("../../db/schema/prefixSchema");

module.exports = async (client) => {
  const prefix = {};
  await loadPrefix(client, prefix);

  client.on("message", async (message) => {
    const { content, guild, member } = message;

    const command = content.replace(prefix[guild.id], "").split(" ");
    const newPrefix = command[1];

    if (command[0] === "prefix" && newPrefix) {
      if (!member.hasPermission("ADMINISTRATOR")) {
        return message.reply(
          "You do not have permission to change bot prefix!"
        );
      }

      await mongodb().then(async (mongoose) => {
        try {
          await prefixSchema.findByIdAndUpdate(guild.id, {
            serverPrefix: newPrefix
          });

          message.reply(`Prefix changed! now the bot prefix is '${newPrefix}'`);
        } finally {
          mongoose.connection.close();
        }
      });
    } else if (command[0] === "prefix" && !newPrefix) {
      return message.reply(
        "You must include the new prefix as the second argument."
      );
    }
  });
};

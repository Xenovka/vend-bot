const mongodb = require("../../db/mongodb");
const prefixSchema = require("../../db/schema/prefixSchema");

module.exports = {
  commands: "prefix",
  expectedArgs: "<newPrefix>",
  permissionError:
    'Only member with permission of "ADMINISTRATOR" can use this command.',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, argsText) => {
    const { guild} = message

    const newPrefix = arguments[0]

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
  }
};


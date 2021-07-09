const prefixSchema = require("../db/schema/prefixSchema");
const mongodb = require("../db/mongodb");

module.exports.loadPrefix = async (client, guildPrefix = {}) => {
  await mongodb().then(async (mongoose) => {
    try {
      for (const guild of client.guilds.cache) {
        const guildId = guild[1].id;
        const result = await prefixSchema.findById(guildId);
        guildPrefix[guildId] = result.serverPrefix;
      }

      return guildPrefix;
    } finally {
      mongoose.connection.close();
    }
  });
};

const mongodb = require("../db/mongodb");
const prefixSchema = require("../db/schema/prefixSchema");

module.exports = async (client) => {
  const guildId = client.guilds.cache.map((guild) => guild.id)[0];

  // Create default prefix automatically if there's no prefix found inside the database
  await mongodb().then(async (mongoose) => {
    try {
      const result = await prefixSchema.findById(guildId);

      if (result === null) {
        await new prefixSchema({
          _id: guildId,
          serverPrefix: "!"
        }).save();

        console.log("Default prefix for bot is !");
      }

      return;
    } finally {
      mongoose.connection.close();
    }
  });
};

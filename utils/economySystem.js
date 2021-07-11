const mongodb = require("../db/mongodb");
const userSchema = require("../db/schema/userSchema");

module.exports = (client) => {
  client.on("message", (message) => {
    const { member, guild } = message;

    if (member.user.bot) return;

    addCoins(guild.id, member.id, 20);
  });
};

const addCoins = async (guildId, userId, amount) => {
  await mongodb().then(async () => {
    try {
      await userSchema.findOneAndUpdate(
        { guildId, userId },
        { guildId, userId, $inc: { coins: amount } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
    }
  });
};

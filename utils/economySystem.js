const mongodb = require("../db/mongodb");
const userSchema = require("../db/schema/userSchema");

module.exports = (client) => {
  client.on("message", (message) => {
    const { member, guild } = message;

    if (member.user.bot) return;

    addCoins(guild.id, member.id, member.user.username, member.user.tag, 20);
  });
};

const addCoins = async (guildId, userId, username, usertag, amount) => {
  await mongodb().then(async () => {
    try {
      await userSchema.findOneAndUpdate(
        { guildId, userId },
        { guildId, userId, username, usertag, $inc: { coins: amount } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
    }
  });
};

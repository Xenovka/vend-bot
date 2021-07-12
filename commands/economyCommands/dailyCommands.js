const mongodb = require("../../db/mongodb");
const dailyRewardSchema = require("../../db/schema/dailyRewardSchema");
const userSchema = require("../../db/schema/userSchema");

let claimedCache = [];
const dailyRewards = 2500;

const clearCache = () => {
  claimedCache = [];
  setTimeout(clearCache, 1000 * 60 * 10);
};

clearCache();

module.exports = {
  commands: "daily",
  cooldown: 10,
  callback: async ({ message }) => {
    const { member, guild } = message;

    const guildId = guild.id;
    const userId = member.id;

    if (claimedCache.includes(userId)) {
      return message.reply("You **already claimed** the daily rewards!");
    }

    const filObj = {
      guildId,
      userId
    };

    await mongodb().then(async () => {
      try {
        const userDaily = await dailyRewardSchema.findOne(filObj);

        if (userDaily) {
          const then = new Date(userDaily.updatedAt).getTime();
          const now = new Date().getTime();

          const diffTime = Math.abs(now - then);
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays <= 1) {
            claimedCache.push(userId);

            return message.reply("You **already claimed** the daily rewards!");
          }
        }

        await dailyRewardSchema.findOneAndUpdate(filObj, filObj, {
          upsert: true
        });

        await userSchema.findOneAndUpdate(
          filObj,
          { guildId, userId, $inc: { coins: dailyRewards } },
          { upsert: true }
        );

        claimedCache.push(userId);

        message.reply(
          `Just **claimed ${dailyRewards} coins** as the daily rewards!`
        );
      } catch (err) {
        console.log(err);
      }
    });
  }
};

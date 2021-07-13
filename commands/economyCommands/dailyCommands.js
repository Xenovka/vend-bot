const humanize = require("humanize-duration");
const mongodb = require("../../db/mongodb");
const dailyRewardSchema = require("../../db/schema/dailyRewardSchema");
const userSchema = require("../../db/schema/userSchema");

let claimedCache = [];
const dailyRewards = {
  coins: 2500,
  exp: 1000
};

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
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 22));

          if (diffDays < 1) {
            claimedCache.push(userId);
            const timeClaimed = humanize(diffTime, {
              units: ["h", "m", "s"],
              round: true,
              conjunction: " and ",
              serialComma: false
            });
            return message.reply(
              `You **just claimed** your daily rewards **${timeClaimed} ago**. You can claim your daily rewards after **22 hours.**`
            );
          }
        }

        await dailyRewardSchema.findOneAndUpdate(filObj, filObj, {
          upsert: true
        });

        await userSchema.findOneAndUpdate(
          filObj,
          {
            guildId,
            userId,
            $inc: { coins: dailyRewards.coins, exp: dailyRewards.exp }
          },
          { upsert: true }
        );

        claimedCache.push(userId);

        message.reply(
          `Just **claimed ${dailyRewards.coins} coins** and **${dailyRewards.exp}** as the daily rewards!`
        );
      } catch (err) {
        console.log(err);
      }
    });
  }
};

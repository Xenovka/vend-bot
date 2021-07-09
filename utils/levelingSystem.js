const mongodb = require("../db/mongodb");
const userSchema = require("../db/schema/userSchema");

module.exports = (client) => {
  client.on("message", (message) => {
    const { member, guild } = message;

    if (member.id === "850007516783575090") return;

    addXP(guild.id, member.id, 27, message);
  });
};

const addXP = async (guildId, userId, amount, message) => {
  const { channel, member } = message;

  await mongodb().then(async (mongoose) => {
    try {
      const userProfile = await userSchema.findOneAndUpdate(
        { guildId, userId },
        { guildId, userId, $inc: { xp: amount } },
        { upsert: true, new: true }
      );

      let { xp, level } = userProfile;
      const xpToLevelUp = requiredXP(level);

      if (xp >= xpToLevelUp) {
        level += 1;
        xp -= xpToLevelUp;

        channel.send(
          `Congrats, <@${member.id}>. You've just got leveled up to level ${level}!`
        );
      }

      await userSchema.updateOne({ guildId, userId }, { level, xp });
    } finally {
      mongoose.connection.close();
    }
  });
};

const requiredXP = (level) => {
  const defaultRequiredXP = 150;
  if (!level) {
    return defaultRequiredXP;
  }

  return Math.pow(level, 2) * defaultRequiredXP + level * 2;
};

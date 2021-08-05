const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
const mongodb = require("../../db/mongodb");
const userSchema = require("../../db/schema/userSchema");

module.exports = {
  commands: ["rank", "level"],
  callback: async ({ message }) => {
    const { author, channel } = message;

    await mongodb().then(async (mongoose) => {
      try {
        const getUserData = await userSchema.findOne({ userId: author.id });
        const userXP = getUserData.xp;
        const userLevel = getUserData.level;

        const rank = new canvacord.Rank()
          .setAvatar(author.avatarURL({ dynamic: false, format: "png" }))
          .setCurrentXP(userXP)
          .setRequiredXP(Math.pow(userLevel, 2) * 150 + userLevel * 2)
          .setStatus(author.presence.status)
          .setUsername(author.username)
          .setDiscriminator(author.discriminator)
          .setLevel(userLevel)
          .setProgressBar("ORANGE");

        rank.build().then((data) => {
          const attachment = new MessageAttachment(data, "rankcard.png");
          channel.send(attachment);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
};

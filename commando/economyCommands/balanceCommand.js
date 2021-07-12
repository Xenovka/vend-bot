const { MessageEmbed } = require("discord.js");
const mongodb = require("../../db/mongodb");
const userSchema = require("../../db/schema/userSchema");

module.exports = {
  commands: ["balance", "bal"],
  cooldown: 5,
  minArgs: 0,
  maxArgs: 1,
  callback: async ({ message }) => {
    const { mentions, member, channel, guild } = message;

    let guildId = guild.id;
    let userId;
    let userTag;
    let userAvatar;

    const mentionedUser = mentions.members.first();

    if (!mentionedUser) {
      userId = member.id;
      userTag = member.user.tag;
      userAvatar = member.user.avatarURL();
    } else {
      userId = mentionedUser.id;
      userTag = mentionedUser.user.tag;
      userAvatar = mentionedUser.user.avatarURL();
    }

    await mongodb().then(async () => {
      try {
        const userProfile = await userSchema.findOne({ guildId, userId });

        const embeds = new MessageEmbed()
          .setColor("ORANGE")
          .setDescription(
            `**Showing Balance of [** ${userTag} **]** ● **${userProfile.coins} coins**`
          )
          .setFooter(userTag, userAvatar)
          .setTimestamp();

        channel.send(embeds);
      } catch (err) {
        console.log(err);
      }
    });
  }
};

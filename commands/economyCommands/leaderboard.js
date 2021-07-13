const { MessageEmbed } = require("discord.js");
const mongodb = require("../../db/mongodb");
const userSchema = require("../../db/schema/userSchema");

module.exports = {
  commands: "top",
  cooldown: 10,
  callback: async ({ message }) => {
    const { channel, guild, author } = message;

    const guildName = guild.name;
    const guildId = guild.id;
    const guildIcon = guild.iconURL();
    const messageAuthor = author.tag;

    const memberData = [];

    await mongodb().then(async () => {
      try {
        const getMemberData = await userSchema
          .find({ guildId })
          .sort({ level: -1 })
          .limit(10);
        console.log(getMemberData);

        for (let i = 0; i < getMemberData.length; i++) {
          memberData.push({
            name: `#${i + 1} • ${getMemberData[i].username}`,
            value: `Level • **${getMemberData[i].level}** \n Balance • **${getMemberData[i].coins} coins**`,
            inline: false
          });
        }
      } catch (err) {
        console.log(err);
      }
    });

    const embeds = new MessageEmbed()
      .setTitle(guildName)
      .setThumbnail(guildIcon)
      .setColor("ORANGE")
      .setDescription(
        "`This Leaderboard Based on Member's Level and Only Showing The Top 10 Members`"
      )
      .addFields(memberData)
      .setFooter(guildName, guildIcon)
      .setTimestamp();

    channel.send(
      `> **Showing Leaderboard • [** ${messageAuthor} **]**`,
      embeds
    );
  }
};

const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  commands: "info",
  cooldown: 5,
  callback: ({ message }) => {
    const { author, channel, member } = message;

    const userTag = author.tag;
    const userId = author.id;
    const userAvatar = author.avatarURL();
    const nickname = "None" || member.nickname;
    const userCreatedAt = moment(author.createdAt).format(
      "dddd, D MMMM YYYY, hh:mm:ss A"
    );
    const userJoinDate = moment(member.joinedAt).format(
      "dddd, D MMMM YYYY, hh:mm:ss A"
    );
    let userRoles = [];

    member.roles.cache
      .filter((key) => key.name !== "@everyone")
      .each((key) => userRoles.push(`<@&${key.id}>`));

    const embeds = new MessageEmbed()
      .setAuthor(userTag, userAvatar)
      .setThumbnail(userAvatar)
      .setColor("ORANGE")
      .addFields(
        {
          name: "ID",
          value: userId,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: "Nickname",
          value: nickname,
          inline: true
        },
        {
          name: "Account Created",
          value:
            userCreatedAt + " [`" + moment(author.createdAt).fromNow() + "`]",
          inline: false
        },
        {
          name: "Join Date",
          value:
            userJoinDate + " [`" + moment(member.joinedAt).fromNow() + "`]",
          inline: false
        },
        {
          name: "Roles",
          value: userRoles.join(", "),
          inline: false
        }
      )
      .setFooter("Showing your informations")
      .setTimestamp();

    channel.send(embeds);
  }
};

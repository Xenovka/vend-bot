const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  commands: "info",
  cooldown: 5,
  minArgs: 0,
  maxArgs: 1,
  callback: ({ message }) => {
    const { author, channel, member, mentions } = message;

    const mentionedMember = mentions.members.first();

    if (!mentionedMember) {
      embedMessage(author, member, channel);
    } else {
      embedMessage(mentionedMember.user, mentionedMember, channel);
    }
  }
};

const embedMessage = (user, member, channel) => {
  const userTag = user.tag;
  const userId = user.id;
  const userAvatar = user.avatarURL();
  const nickname = member.nickname || "None";
  const userCreatedAt = moment(user.createdAt).format(
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
        value: userCreatedAt + " [`" + moment(user.createdAt).fromNow() + "`]",
        inline: false
      },
      {
        name: "Join Date",
        value: userJoinDate + " [`" + moment(member.joinedAt).fromNow() + "`]",
        inline: false
      },
      {
        name: "Roles",
        value: userRoles.join(", "),
        inline: false
      }
    )
    .setFooter(`Showing Informations of ${user.username}`)
    .setTimestamp();

  return channel.send(embeds);
};

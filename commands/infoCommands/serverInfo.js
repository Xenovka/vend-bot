const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  commands: "server",
  cooldown: 5,
  callback: async ({ message }) => {
    const { guild, channel } = message;
    const fetchMember = await guild.fetchPreview();

    const guildName = guild.name;
    const guildIcon = guild.iconURL();
    const guildId = guild.id;
    const guildOwner = guild.ownerID;
    const totalMember = guild.memberCount;
    const onlineMember = fetchMember.approximatePresenceCount;
    const totalChannels = guild.channels.cache.map((channel) => channel).length;
    const totalRoles = guild.roles.cache.map((role) => role).length;
    const guildCreatedAt = moment(guild.createdAt).format(
      "ddd, MMMM Do YYYY, hh:mm:ss A"
    );

    let guildEmojis = "";

    guild.emojis.cache.each((emoji) => {
      guildEmojis += `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`;
    });

    const embeds = new MessageEmbed()
      .setAuthor(guildName, guildIcon)
      .setTitle(`ID : ${guildId}`)
      .setThumbnail(guildIcon)
      .addFields(
        {
          name: "Server Owner",
          value: `<@${guildOwner}> ` + "[`" + guild.owner.user.tag + "`]",
          inline: false
        },
        {
          name: "Members",
          value: totalMember,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: "Online Members",
          value: onlineMember,
          inline: true
        },
        {
          name: "Channels",
          value: totalChannels,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: "Roles",
          value: totalRoles,
          inline: true
        },
        {
          name: "Server Created At",
          value:
            guildCreatedAt + " [`" + moment(guild.createdAt).fromNow() + "`]",
          inline: false
        },
        {
          name: "Emojis",
          value: guildEmojis,
          inline: false
        }
      )
      .setFooter(guildName, guildIcon)
      .setColor("ORANGE")
      .setTimestamp();

    channel.send(embeds);
  }
};

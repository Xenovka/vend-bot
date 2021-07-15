const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  commands: "bot",
  cooldown: 5,
  callback: async ({ message, client }) => {
    const { channel } = message;
    const app = await client.fetchApplication();
    const appOwner = app.owner.tag;
    const appIcon = app.iconURL();
    const appName = app.name;
    const appCreatedAt = moment(app.createdAt).format("MMMM Do YYYY");

    const seconds = moment.duration(client.uptime).seconds();
    const minutes = moment.duration(client.uptime).minutes();
    const hours = moment.duration(client.uptime).hours();
    const days = moment.duration(client.uptime).days();

    const embeds = new MessageEmbed()
      .setAuthor(appName, appIcon)
      .setThumbnail(appIcon)
      .setColor("ORANGE")
      .addFields(
        {
          name: "Creator",
          value: appOwner,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: "Version",
          value: "1.5.0",
          inline: true
        },
        {
          name: "Uptime",
          value: `${days}d${hours}h${minutes}m${seconds}s`,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: "Created At",
          value: appCreatedAt + " [`" + moment(app.createdAt).fromNow() + "`]",
          inline: true
        },
        {
          name: "Library",
          value: "Discord.js",
          inline: true
        }
      )
      .setFooter(appName, appIcon)
      .setTimestamp();

    channel.send(embeds);
  }
};

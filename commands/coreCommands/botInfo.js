const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  commands: 'bot',
  callback: (message, arguments, argsText, client) => {
    const {channel} = message
    const app = client.user
    const appIcon = app.avatarURL()
    const appName = app.username
    const appCreatedAt = moment(app.createdAt).format('MMMM Do YYYY')

    const seconds = moment.duration(client.uptime).asSeconds().toFixed()
    const minutes = moment.duration(client.uptime).asMinutes().toFixed()
    const hours = moment.duration(client.uptime).asHours().toFixed()
    const days = moment.duration(client.uptime).asDays().toFixed()

    const embeds = new MessageEmbed()
      .setAuthor(appName, appIcon)
      .setThumbnail(appIcon)
      .setColor('ORANGE')
      .addFields(
        {
          name: 'Creator',
          value: 'vend#4963',
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: 'Version',
          value: '1.5.0',
          inline: true
        },
        {
          name: 'Uptime',
          value: `${days}d${hours}h${minutes}m${seconds}s`,
          inline: true
        },
        { name: "_ _", value: "_ _", inline: true },
        {
          name: 'Created At',
          value: appCreatedAt + " [`" + moment(app.createdAt).fromNow() + "`]",
          inline: true
        },
        {
          name: 'Library',
          value: 'Discord.js',
          inline: true
        }
      )
      .setFooter(appName, appIcon)
      .setTimestamp()

    channel.send(embeds)
  }
}
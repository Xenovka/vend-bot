const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "👋-come-and-leave"
    );

    const newMember = member.user.tag;
    const newMemberAvatar = member.user.avatarURL();
    const guildName = member.guild.name;

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(newMember, newMemberAvatar)
      .setDescription([
        `**hi ${newMember}, welcome to ${guildName}**`,
        "_ _",
        `hi <@${member.id}>`,
        "thanks for joining our server, hope u stay with us!"
      ])
      .setThumbnail(
        "https://i.pinimg.com/originals/e3/c7/47/e3c747b1bf7b80b066f62d629209e694.gif"
      )
      .setImage(
        "https://i.pinimg.com/originals/e3/c7/47/e3c747b1bf7b80b066f62d629209e694.gif"
      )
      .setFooter("Joined at ")
      .setTimestamp();

    channel.send(embeds);
  });
};

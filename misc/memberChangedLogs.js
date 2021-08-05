const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  const guild = client.guilds.cache.first();
  const channel = guild.channels.resolve("870135896450691102");

  client.on("userUpdate", (oldUser, newUser) => {
    const isAvatarChanged = oldUser.avatarURL() !== newUser.avatarURL();
    const isUsernameChanged = oldUser.username !== newUser.username;

    const userTag = newUser.tag;
    const userAvatar = newUser.avatarURL({ dynamic: true });
    const userId = newUser.id;

    if (isAvatarChanged) {
      const embeds = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(userTag, userAvatar)
        .setThumbnail(userAvatar)
        .setDescription(`**📸 <@${userId}>'s Updating their profile picture**`)
        .addField(
          "Avatar",
          `[Before](${oldUser.avatarURL()}) → [After](${userAvatar})`
        )
        .setFooter(`USER ID • ${userId}`)
        .setTimestamp();

      channel.send(embeds);
      return;
    }

    if (isUsernameChanged) {
      const embeds = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(userTag, userAvatar)
        .setThumbnail(userAvatar)
        .setDescription(`**✏ <@${userId}>'s Updating their username**`)
        .addFields(
          {
            name: "Username",
            value: `${oldUser.username} → ${newUser.username}`
          },
          {
            name: "Discriminator",
            value: `${oldUser.discriminator} → ${newUser.discriminator}`
          }
        )
        .setFooter(`USER ID • ${userId}`)
        .setTimestamp();

      channel.send(embeds);
      return;
    }
  });

  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const isNicknameChanged = oldMember.nickname !== newMember.nickname;
    const oldRoles = oldMember.roles.cache.map((role) => role.name);
    const newRoles = newMember.roles.cache.map((role) => role.name);
    const isRoleRemoved = oldRoles.length > newRoles.length;
    const isRoleAdded = oldRoles.length < newRoles.length;
    const memberTag = newMember.user.tag;
    const memberAvatar = newMember.user.avatarURL();
    const memberId = newMember.id;
    const getAuditLogs = await guild.fetchAuditLogs({
      limit: 5,
      user: memberId
    });
    const memberChanges = getAuditLogs.entries.first().changes[0];

    if (isNicknameChanged) {
      const embeds = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(memberTag, memberAvatar)
        .setThumbnail(memberAvatar)
        .setDescription(`**📝 <@${memberId}> Nickname Changed**`)
        .addFields(
          {
            name: "Old Nickname",
            value: `\`${memberChanges.old || oldMember.displayName}\``,
            inline: true
          },
          {
            name: "New Nickname",
            value: `\`${memberChanges.new || newMember.displayName}\``,
            inline: true
          }
        )
        .setFooter(`USER ID • ${memberId}`)
        .setTimestamp();

      channel.send(embeds);
      return;
    }

    if (isRoleRemoved) {
      const embeds = new MessageEmbed()
        .setColor("RED")
        .setAuthor(memberTag, memberAvatar)
        .setThumbnail(memberAvatar)
        .setDescription(`**📝 <@${memberId}> Roles Changed**`)
        .addField("❗ Deleted Roles", memberChanges.new[0].name)
        .setFooter(`USER ID • ${memberId}`)
        .setTimestamp();

      channel.send(embeds);
      return;
    }

    if (isRoleAdded) {
      const embeds = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(memberTag, memberAvatar)
        .setThumbnail(memberAvatar)
        .setDescription(`**📝 <@${memberId}> Roles Changed**`)
        .addField("✅ Added Roles", memberChanges.new[0].name)
        .setFooter(`USER ID • ${memberId}`)
        .setTimestamp();

      channel.send(embeds);
      return;
    }
  });
};

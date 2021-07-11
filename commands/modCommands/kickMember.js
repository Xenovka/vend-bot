module.exports = {
  commands: "kick",
  expectedArgs: "[@member] [reasons]",
  permissionError:
    'Only member with permission of "ADMINISTRATOR" can use this command.',
  minArgs: 1,
  maxArgs: 30,
  permissions: "ADMINISTRATOR",
  callback: async ({ message, args }) => {
    const { guild, mentions, channel } = message;

    const mentionedUser = mentions.users.first();
    const kickReason = args.slice(1, args.length).join(" ");

    if (!mentionedUser) {
      channel.send(
        "You should mention the user you want to kick from the guild."
      );
      return;
    }

    if (!kickReason) {
      await guild.member(mentionedUser.id).kick();
      channel.send(
        `<@${mentionedUser.id}> has been kicked for the server for no reason.`
      );
      return;
    }

    await guild.member(mentionedUser.id).kick(kickReason);
    channel.send(
      `<@${mentionedUser.id}> has been kicked for the server because ${kickReason}.`
    );
  }
};

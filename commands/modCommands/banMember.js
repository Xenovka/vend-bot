module.exports = {
  commands: "ban",
  expectedArgs: "[@member] [days] [reason]",
  permissionError:
    'Only member with permission of "ADMINISTRATOR" can use this command.',
  minArgs: 1,
  maxArgs: 40,
  permissions: "ADMINISTRATOR",
  callback: async ({ message, args }) => {
    const { guild, mentions, channel } = message;

    const mentionedUser = mentions.users.first();
    const banDay = +args[1];
    const banReason = args.slice(2, args.length);

    if (!mentionedUser) {
      channel.send(
        "You should mention the user you want to ban from the server."
      );
      return;
    }

    const userId = mentionedUser.id;

    if (args.length === 1) {
      await guild.member(userId).ban();
      channel.send(`<@${userId} has been temporarily banned from this server.`);
    }

    if (isNaN(banDay)) {
      channel.send("Second arguments must be a number!");
      return;
    } else if (banDay > 7) {
      channel.send("You can't ban a member more than 7 days");
      return;
    }

    if (!banReason) {
      await guild.member(userId).ban({ days: banDay });
      channel.send(
        `<@${userId}> has been banned for ${banDay} day(s) from the server.`
      );
      return;
    }

    await guild.member(userId).ban({ days: banDay, reason: banReason });
    channel.send(
      `<@${userId}> has been banned for ${banDay} day(s) from the server because ${banReason}.`
    );
  }
};

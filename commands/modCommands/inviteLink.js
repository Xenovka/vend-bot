module.exports = {
  commands: 'invite',
  permissionError:
    'Only member with permission of "ADMINISTRATOR" can use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, argsText) => {
    const {guild, channel} = message
    
    const createInviteLink = await guild.fetchInvites().then((invites) => {
      let results = [];

      invites.forEach((invite) => {
        results.push(invite.code);
      });

      const createdInviteLink = `https://discord.gg/${
        results[results.length - 1]
      }`;

      channel.send(createdInviteLink);
    });
  }
}

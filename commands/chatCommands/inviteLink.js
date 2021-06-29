// const commands = require("../commandHandler");

module.exports = {
  commands: 'invite',
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

// module.exports = (client) => {
//   commands(client, "invite", async (message) => {
//     const { guild, channel } = message;

//     const createInviteLink = await guild.fetchInvites().then((invites) => {
//       let results = [];

//       invites.forEach((invite) => {
//         results.push(invite.code);
//       });

//       const createdInviteLink = `https://discord.gg/${
//         results[results.length - 1]
//       }`;

//       channel.send(createdInviteLink);
//     });
//   });
// };

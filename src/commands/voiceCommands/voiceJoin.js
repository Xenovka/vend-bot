const commands = require("../commandHandler/commands");

module.exports = async (client) => {
  commands(client, "join", async (message) => {
    const { guild, member } = message;

    if (!guild) return;

    if (member.voice.channel) {
      const connect = await member.voice.channel
        .join()
        .then(async (connection) => {
          const deafen = await connection.voice.setSelfDeaf(true);
        });
    } else {
      message.reply(
        "You must be in the voice channel before u tell me to join!"
      );
    }
  });

  // const prefix = {};
  // await loadPrefix(client, prefix);

  // client.on("message", async (message) => {

  //   const { content, guild, member } = message;

  //   const command = content.replace(prefix[guild.id], "");

  //   if (!guild) return;

  //   if (command == "join") {
  //     if (member.voice.channel) {
  //       const connect = await member.voice.channel
  //         .join()
  //         .then(async (connection) => {
  //           const deafen = await connection.voice.setSelfDeaf(true);
  //         });
  //     } else {
  //       message.reply(
  //         "You must be in the voice channel before u tell me to join!"
  //       );
  //     }
  //   }
  // });
};

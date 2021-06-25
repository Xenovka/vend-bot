const { prefix } = require("../../config/config.json");

module.exports = (client) => {
  client.on("message", async (message) => {
    const { content, guild, member } = message;

    const command = content.replace(prefix, "");

    if (!guild) return;

    if (command == "join") {
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
    }

    if (command == "dc") {
      if (member.voice.channel) {
        const disconnect = await member.voice.channel
          .join()
          .then((connection) => {
            return connection.disconnect();
          });
      } else {
        message.reply(
          "You must be in the voice channel before u tell me to leave the voice channel!"
        );
      }
    }
  });
};

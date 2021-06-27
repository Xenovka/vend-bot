const commands = require("../commandHandler/commands");

module.exports = (client) => {
  commands(client, "dc", async (message) => {
    const { member } = message;

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
  });
};

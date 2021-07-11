module.exports = {
  commands: "join",
  callback: async ({ message }) => {
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
  }
};

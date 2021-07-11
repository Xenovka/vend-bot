module.exports = {
  commands: "dc",
  callback: ({ message }) => {
    const { member, channel } = message;

    if (member.voice.channel) {
      member.voice.channel.leave();
    } else {
      message.reply(
        "You must be in the voice channel before u tell me to leave the voice channel!"
      );
    }
  }
};

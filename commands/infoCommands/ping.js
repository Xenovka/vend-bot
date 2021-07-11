module.exports = {
  commands: "ping",
  cooldown: 5,
  callback: ({ message, client }) => {
    message.channel.send("Loading. . .").then((result) => {
      const ping = result.createdTimestamp - message.createdTimestamp;

      result.edit(
        `Bot Latency: ${ping}ms\nServer Latency: ${client.ws.ping}ms`
      );
    });
  }
};

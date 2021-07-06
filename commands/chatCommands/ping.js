module.exports = {
  commands: 'ping',
  callback: (message, arguments, argsText) => {
    message.channel.send('Loading. . .').then(result => {
      const ping = result.createdTimestamp - message.createdTimestamp

      result.edit(`Bot Latency: ${ping}ms`);
    })
  }
}
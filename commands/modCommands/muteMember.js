module.exports = {
  commands: 'mute',
  expectedArgs: '[@member] [minute] [reasons]',
  permissionError:
    'Only member with permission of "ADMINISTRATOR" can use this command.',
  minArgs: 2,
  maxArgs: 30,
  permissions: 'ADMINISTRATOR',
  callback: (message, arguments, argsText) => {
    const {channel, mentions, guild} = message

    const mentionedUser = mentions.users.first()

    if (!mentionedUser) {
      channel.send('You should mention the user you want to be muted.')
      return;
    }

    const mutedDuration = +arguments[1]
    const mutedReason = arguments.slice(2, arguments.length).join(' ')

    if (mutedDuration > 60) {
      channel.send("You can't mute a member more than 1 hour!")
      return
    } else if (mutedDuration <= 0) {
      channel.send("You should mute a member 1 or more than 1 minute!")
      return
    } else if (isNaN(mutedDuration)) {
      channel.send('Duration must be a number!')
      return
    }
    
    if(!mutedReason) {
      channel.send(`<@${mentionedUser.id}> can't send messages for ${mutedDuration} minutes for no reason.`)
    } else {
      channel.send(`<@${mentionedUser.id}> can't send messages for ${mutedDuration} minutes because of ${mutedReason}.`)
    }

    channel.updateOverwrite(mentionedUser.id, { SEND_MESSAGES: false })
    
    setTimeout(() => {
      channel.updateOverwrite(mentionedUser.id, { SEND_MESSAGES: true })
      channel.send(`<@${mentionedUser.id}> already unmuted after getting muted for ${mutedDuration} minutes.`)
    }, mutedDuration * 60000)
  }
}
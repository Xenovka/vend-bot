const { loadPrefix } = require("../utils/serverPrefix");

module.exports = async (client, commandOptions) => {
  const loadedPrefix = {}
  await loadPrefix(client, loadedPrefix)

  let {
    commands,
    expectedArgs = '',
    permissionError = '',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  if (typeof commands === 'string') {
    commands = [commands]
  }

  if (permissions.length) {
    if(typeof permissions === 'string') {
      permissions = [permissions]
    }
  }  

  client.on('message', message => {
    const {member, content, guild} = message

    const prefix = loadedPrefix[guild.id]

    for(const alias of commands) {
      const arguments = content.split(/[ ]+/)

      if(arguments[0] === prefix + alias) {
        for (const permission of permissions) {
          if(!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        for(const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(role => 
            role.name === requiredRole)
          
          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(`You must have ${requiredRole} to use that command.`)
          }
        }

        arguments.shift()

        if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
          message.reply(`Incorrect command usage! type ${prefix}${alias} ${expectedArgs} to use the command.`)
          return
        }

        callback(message, arguments, arguments.join(' '), client, alias) 
        
      }
    }

  })

  
}


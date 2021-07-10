const { loadPrefix } = require("../utils/serverPrefix");

let recentlyUsed = []

module.exports = async (client, commandOptions) => {
  const loadedPrefix = {}
  await loadPrefix(client, loadedPrefix)

  let {
    commands,
    cooldown = -1,
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

        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`

        if(cooldown > 0 && recentlyUsed.includes(cooldownString)) {
          message.reply(`Slow down, You have to wait for **${cooldown} seconds** to use this command again.`).then(async msg => {
            await msg.delete({timeout: 2000})
          })
          return
        }

        arguments.shift()

        if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
          message.reply(`Incorrect command usage! type ${prefix}${alias} ${expectedArgs} to use the command.`)
          return
        }

        if(cooldown > 0) {
          recentlyUsed.push(cooldownString)
  
          setTimeout(() => {
            recentlyUsed = recentlyUsed.filter(string => {
              return string !== cooldownString
            })
          }, 1000 * cooldown);
        }

        callback(message, arguments, arguments.join(' '), client, alias) 
        
      }
    }

  })

  
}


const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: "help",
  cooldown: 5,
  callback: ({ message }) => {
    const embed = new MessageEmbed()
      .setAuthor("Bot Commands 🤖")
      .setColor("ORANGE")
      .setFooter(
        "hover over a commands for more infomations about that command!"
      )
      .setURL("https://www.remote.tools/remote-work/discord-everyone-here")
      .setTimestamp()
      .setDescription(
        "to use a command, type `![command]`, if there's any bug on the command, tell the mod immediately. Other commands will added very soon!"
      )
      .addFields(
        {
          name: "Information  👀",
          value:
            "[`help`](https://discord.com/ 'Showing available commands') [`server`](https://discord.com/ 'Showing server info') [`bot`](https://github.com/Xenovka?tab=repositories 'Showing bot info') [`info`](https://discord.com/ 'Showing user info') [`invite`](https://discord.com/ 'Creating Server's invite link') [`ping`](https://discord.com/ 'Check Bot and Server Latency') [`avatar`](https://discord.com/ 'Showing user's avatar')",
          inline: true
        },
        {
          name: "Voice  🎶",
          value:
            "[`dc`](https://discord.com 'Disconnecting the bot from the Voice Channel') [`join`](https://discord.com/ 'Telling the bot to join a Voice Channel') [`play`](https://discord.com/ 'Playing an audio from youtube. Usage: play [songTitle]') [`lyrics`](https://www.npmjs.com/package/lyrics-finder/ 'Find a song lyrics. Usage: lyrics [songTitle]') \n [`skip`](https://discord.com/ 'Skip current playing song.') [`queue`](https://discord.com/ 'Showing the list of songs in queue.') ",
          inline: true
        },
        {
          name: "Socials  💬",
          value:
            "[`angry`](https://github.com/uzair-ashraf/ 'angry reaction.') [`happy`](https://github.com/uzair-ashraf/ 'happy reaction.') [`dance`](https://github.com/uzair-ashraf/ 'dance reaction.') [`calm`](https://github.com/uzair-ashraf/ 'calm reaction.') [`confused`](https://github.com/uzair-ashraf/ 'confused reaction.') [`random`](https://github.com/uzair-ashraf/ 'random reaction.') [`exercise`](https://github.com/uzair-ashraf/ 'exercise reaction.') [`sad`](https://github.com/uzair-ashraf/ 'sad reaction.') [`no`](https://github.com/uzair-ashraf/ 'no reaction.') [`yes`](https://github.com/uzair-ashraf/ 'yes reaction.') [`thinking`](https://github.com/uzair-ashraf/ 'thinking reaction.') [`eat`](https://github.com/uzair-ashraf/ 'eat reaction.') [`smug`](https://github.com/uzair-ashraf/ 'smug reaction.')",
          inline: true
        },
        {
          name: "Moderation  👨‍💻",
          value:
            "[`prefix`](https://discord.com/ 'Changing bot prefix. Default prefix is '!' ') [`mute`](https://discord.com/ 'mute a member. Usage: [@member] [minute] [reasons]') [`kick`](https://discord.com/ 'kick a member. Usage: [@member] [reasons]') [`ban`](https://discord.com/ 'ban a member. Usage: [@member] [days] [reasons]')",
          inline: true
        },
        {
          name: "Economy  💸",
          value:
            "[`balance`](https://github.com/Xenovka?tab=repositories 'Check your balance.') [`daily`](https://github.com/Xenovka?tab=repositories 'Claim daily rewards.')",
          inline: true
        },
        {
          name: "Coming Soon  🎮",
          value:
            "[`some commands still under development by the developer, Thanks.`](https://github.com/Xenovka?tab=repositories 'Coming Soon!')",
          inline: true
        }
      );

    message.channel.send(embed);
  }
};

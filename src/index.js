const Discord = require("discord.js");
const client = new Discord.Client();

const { token } = require("./config/config.json");

const serverInfo = require("./commands/chatCommands/serverInfo");
const avatarInfo = require("./commands/chatCommands/avatarInfo");
const helpCommands = require("./commands/chatCommands/helpCommands");
const voiceJoin = require("./commands/voiceCommands/voiceJoin");
const inviteLink = require("./commands/chatCommands/inviteLink");
const badWords = require("./misc/badWords");
const welcomeMessage = require("./misc/welcomeMessage");
const changePrefix = require("./commands/modCommands/changePrefix");

client.on("ready", async () => {
  console.log(`Logged In as ${client.user.tag}`);

  const botPresence = await client.user.setPresence({
    activity: {
      name: "with xen",
      type: "WATCHING"
    },
    status: "idle"
  });

  // Mod Commands
  changePrefix(client);

  // Regular Commands
  serverInfo(client);
  avatarInfo(client);
  helpCommands(client);
  voiceJoin(client);
  inviteLink(client);

  // Chat Responses
  badWords(client);
  welcomeMessage(client);
});

client.login(token);

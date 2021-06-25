const Discord = require("discord.js");
const client = new Discord.Client();

const { token } = require("./config/config.json");

const serverInfo = require("./commands/chatCommands/serverInfo");
const avatarInfo = require("./commands/chatCommands/avatarInfo");
const helpCommands = require("./commands/chatCommands/helpCommands");
const voiceJoin = require("./commands/voiceCommands/voiceJoin");
const badWords = require("./misc/badWords");
const inviteLink = require("./commands/chatCommands/inviteLink");
const welcomeMessage = require("./misc/welcomeMessage");

client.on("ready", async () => {
  console.log(`Logged In as ${client.user.tag}`);

  const botPresence = await client.user.setPresence({
    activity: {
      name: "Movie with Xen <3",
      type: "WATCHING"
    },
    status: "idle"
  });

  serverInfo(client);
  avatarInfo(client);
  helpCommands(client);
  voiceJoin(client);
  badWords(client);
  inviteLink(client);
  welcomeMessage(client);
});

client.login(token);

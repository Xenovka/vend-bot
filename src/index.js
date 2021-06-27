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
const mongodb = require("./db/mongodb");
const prefixSchema = require("./db/schema/prefixSchema");
const voiceLeave = require("./commands/voiceCommands/voiceLeave");

client.on("ready", async () => {
  console.log("Hi Xen!");

  const botPresence = await client.user.setPresence({
    activity: {
      name: "with xen",
      type: "WATCHING"
    },
    status: "idle"
  });

  const guildId = client.guilds.cache.map((guild) => guild.id)[0];

  // Create default prefix automatically if there's no prefix found inside the database
  await mongodb().then(async (mongoose) => {
    try {
      const result = await prefixSchema.findById(guildId);

      if (result === null) {
        await new prefixSchema({
          _id: guildId,
          serverPrefix: "!"
        }).save();

        console.log("Default prefix for bot is !");
      }
    } finally {
      mongoose.connection.close();
    }
  });

  // Mod Commands
  changePrefix(client);

  // Regular Commands
  serverInfo(client);
  avatarInfo(client);
  helpCommands(client);
  voiceJoin(client);
  voiceLeave(client);
  inviteLink(client);

  // Chat Responses
  badWords(client);
  welcomeMessage(client);
});

client.login(token);

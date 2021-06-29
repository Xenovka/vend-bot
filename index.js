const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const client = new Discord.Client().setMaxListeners(0);

const { token } = require("./config/config.json");

const badWords = require("./misc/badWords");
const welcomeMessage = require("./misc/welcomeMessage");
const createDefaultPrefix = require("./utils/createDefaultPrefix");

client.login(token);

client.on("ready", async () => {
  console.log("Hi Xen!");

  // Set BOT Presence
  await client.user.setPresence({
    activity: {
      name: "with xen",
      type: "PLAYING"
    },
    status: "idle"
  });
});

client.on("ready", () => {
  const baseFile = "commandHandler.js";
  const commands = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commands(client, option);
      }
    }
  };

  readCommands("commands");
});

client.on("ready", () => {
  // Create Default Prefix (!)
  createDefaultPrefix(client);

  // Chat Responses
  badWords(client);
  welcomeMessage(client);
});

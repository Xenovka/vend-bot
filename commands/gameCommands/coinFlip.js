const { MessageEmbed } = require("discord.js");
const mongodb = require("../../db/mongodb");
const userSchema = require("../../db/schema/userSchema");

module.exports = {
  commands: "flip",
  cooldown: 5,
  expectedArgs: "[amount] [head/tail]",
  minArgs: 2,
  maxArgs: 2,
  callback: async ({ message, args }) => {
    const { channel, author, guild } = message;

    const guildId = guild.id;
    const userId = author.id;
    const betAmount = +args[0];

    const userProfile = await userSchema.findOne({ guildId, userId });
    const { coins } = userProfile;

    if (!betAmount) {
      channel.send("The amount must be a number!");
      return;
    } else if (betAmount > coins) {
      channel.send(
        "> You can't bet with **bigger amount** than the **Balance** you had!"
      );
      channel.send(`> Your Balance is • **${coins} coins**`);
      return;
    }

    const randomNumber = Math.round(Math.random() * 1);
    const flipResult = randomNumber === 1 ? "head" : "tail";

    await mongodb().then(async () => {
      try {
        if (args[1] === flipResult) {
          const newBalance = coins + betAmount * 2;
          messageResult(channel, true, flipResult, newBalance);
          await userSchema.findOneAndUpdate(
            { guildId, userId },
            { $inc: { coins: betAmount * 2 } }
          );
        } else {
          const newBalance = coins - betAmount;
          messageResult(channel, false, flipResult, newBalance);
          await userSchema.findOneAndUpdate(
            { guildId, userId },
            { $inc: { coins: -betAmount } }
          );
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};

const messageResult = (channel, isWin, flipResult, newBalance) => {
  const embeds = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(
      `The Result is **${flipResult.toUpperCase()}!** • YOU ${
        isWin ? "**WON!**" : "**LOSE!**"
      } \n Your Balance is Now • **${newBalance} coins**`
    );

  channel.send(embeds);
};

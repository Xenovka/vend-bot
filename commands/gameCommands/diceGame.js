const { MessageEmbed } = require("discord.js");
const mongodb = require("../../db/mongodb");
const userSchema = require("../../db/schema/userSchema");

module.exports = {
  commands: "dice",
  expectedArgs: "[amount]",
  minArgs: 1,
  maxArgs: 1,
  callback: async ({ message, args }) => {
    const { channel, guild, author } = message;

    const guildId = guild.id;
    const userId = author.id;
    const betAmount = +args[0];
    const botDice = Math.ceil(Math.random() * 12);
    const userDice = Math.ceil(Math.random() * 12);
    const totalWinning = betAmount + (userDice - botDice) * (betAmount / 10);

    if (!betAmount) {
      message.reply("the amount of your bet must be a number!");
      return;
    }

    await mongodb().then(async () => {
      try {
        const userProfile = await userSchema.findOne({ guildId, userId });
        const userBalance = userProfile.coins;

        if (userBalance < betAmount) {
          channel.send(
            `> <@${userId}>, You can't bet with amount that bigger than the money you have!`
          );
          channel.send(`> Your balance • **${userBalance} coins**`);
          return;
        }

        if (userDice > botDice) {
          embedMessage(
            channel,
            botDice,
            userDice,
            userId,
            "You have WON",
            totalWinning
          );
          await userSchema.findOneAndUpdate(
            { guildId, userId },
            { $inc: { coins: totalWinning } }
          );
          return;
        } else if (userDice < botDice) {
          embedMessage(
            channel,
            botDice,
            userDice,
            userId,
            "You have LOST",
            betAmount
          );
          await userSchema.findOneAndUpdate(
            { guildId, userId },
            { $inc: { coins: -betAmount } }
          );
        } else if (userDice === botDice) {
          const embeds = new MessageEmbed()
            .setColor("ORANGE")
            .setDescription("Results are equal. It means **DRAW**");

          channel.send(embeds);
          return;
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};

const embedMessage = async (
  channel,
  botDice,
  userDice,
  userId,
  result,
  amount
) => {
  const embeds = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(
      `Your Results Are • **${userDice}** \n My Results Are • **${botDice}** \n <@${userId}> • **${result} ${amount} coins.**`
    );

  channel.send(embeds);
};

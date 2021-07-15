const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: "rps",
  expectedArgs: "[r/p/s]",
  minArgs: 1,
  maxArgs: 1,
  callback: ({ message, args }) => {
    const { channel } = message;

    const randomNumber = Math.round(Math.random() * 2);
    const botChoice =
      randomNumber === 0 ? "Rock" : randomNumber === 1 ? "Paper" : "Scissors";
    const userChoice =
      args[0].toLowerCase() === "r"
        ? "Rock"
        : args[0].toLowerCase() === "p"
        ? "Paper"
        : args[0].toLowerCase() === "s"
        ? "Scissors"
        : false;

    if (!userChoice) {
      message.reply("Make sure you choose between r/p/s");
      return;
    }

    if (
      (userChoice === "Rock" && botChoice === "Paper") ||
      (userChoice === "Paper" && botChoice === "Scissors") ||
      (userChoice === "Scissors" && botChoice === "Rock")
    ) {
      embedMessage(channel, userChoice, botChoice, "**YOU LOSE!**");
      return;
    } else if (
      (userChoice === "Rock" && botChoice === "Scissors") ||
      (userChoice === "Paper" && botChoice === "Rock") ||
      (userChoice === "Scissors" && botChoice === "Paper")
    ) {
      embedMessage(channel, userChoice, botChoice, "**YOU WIN!**");
      return;
    } else if (userChoice === botChoice) {
      embedMessage(channel, userChoice, botChoice, "**DRAW!**");
      return;
    }
  }
};

const embedMessage = (channel, userChoice, botChoice, result) => {
  const embeds = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(
      `You're Choosing **${userChoice.toUpperCase()}** and I'm Choosing **${botChoice.toUpperCase()}** \n The Result is • ${result}`
    );

  channel.send(embeds);
};

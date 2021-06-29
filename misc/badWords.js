const badWords = [
  "ajg",
  "ppk",
  "pepek",
  "kontol",
  "kntl",
  "babi",
  "bbi",
  "anjing",
  "anjeng",
  "pler",
  "puki",
  "kimak",
  "memek",
  "mmk"
];

module.exports = (client) => {
  client.on("message", async (message) => {
    const { content } = message;
    let res = [];

    badWords.map((word) => (content.includes(word) ? res.push(word) : null));

    if (res.length > 0) {
      const deleteMessage = await message
        .delete({ timeout: 1500 })
        .then((msg) =>
          msg.reply(
            "Sorry for deleting your message, try not to use that word anymore :)"
          )
        );
    }
  });
};

const mongodb = require("../../db/mongodb");
const songSchema = require("../../db/schema/songSchema");
const { MessageButton, MessageActionRow } = require("discord-buttons");

let buttonPrev = new MessageButton()
  .setStyle("grey")
  .setLabel("Prev")
  .setID("button_prev");

let buttonNext = new MessageButton()
  .setStyle("grey")
  .setLabel("Next")
  .setID("button_next");

let buttons = new MessageActionRow().addComponents(buttonPrev, buttonNext);

module.exports = {
  commands: ["queue", "q"],
  callback: async ({ message, client }) => {
    const { channel } = message;

    await mongodb().then(async () => {
      try {
        const getPage = await songSchema.paginate({}, { limit: 10 });

        let messages = await queueMessage(getPage.page);

        if (getPage.totalDocs === 0) {
          channel.send("Queue is Empty!");
          return;
        } else if (getPage.totalPages === 1) {
          channel.send(messages);
          return;
        }

        channel.send(messages, buttonNext);

        let counter = getPage.page;

        client.on("clickButton", async (button) => {
          if (button.id === "button_next") {
            await button.reply.defer();
            counter += 1;
            messages = await queueMessage(counter);

            if (counter === getPage.totalPages) {
              button.message.edit(messages, buttonPrev);
              return;
            }

            button.message.edit(messages, buttons);
          }

          if (button.id === "button_prev") {
            await button.reply.defer();
            counter -= 1;
            messages = await queueMessage(counter);

            if (counter === 1) {
              button.message.edit(messages, buttonNext);
              return;
            }

            button.message.edit(messages, buttons);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
};

const queueMessage = async (pageNum) => {
  let queueMessage = "```elm\n";

  await mongodb().then(async () => {
    try {
      let currentDocs = await songSchema.paginate(
        {},
        { page: pageNum, limit: 10 }
      );
      let songs = [];

      songs.push(currentDocs.docs);

      for (let i = 0; i < currentDocs.docs.length; i++) {
        let title = songs[0][i].songTitle.replace("'", "");
        if (title.length >= 35) {
          title = title.slice(0, 35) + "...";
        } else {
          title += " ".repeat(38 - title.length);
        }

        queueMessage += `${songs[0][i].queueNumber}) ${title} ${songs[0][i].songDuration}\n`;
      }
    } catch (err) {
      console.log(err);
    }
  });

  return queueMessage + "```";
};

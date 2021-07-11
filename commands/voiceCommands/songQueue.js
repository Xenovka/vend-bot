const mongodb = require("../../db/mongodb")
const songSchema = require("../../db/schema/songSchema")
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
  commands: ['queue', 'q'],
  callback: async (message, arguments, argsText, client) => {
    const {channel} = message

    await mongodb().then(async () => {
      try {

        let buttonPrev = new MessageButton()
          .setStyle('grey')
          .setLabel('Prev')
          .setID('button_prev')

        let buttonNext = new MessageButton()
          .setStyle('grey')
          .setLabel('Next')
          .setID('button_next')
          

        let buttons = new MessageActionRow()
          .addComponents(buttonPrev, buttonNext)

        const getPage = await songSchema.paginate({}, {limit: 5})

        let messages = await queueMessage(getPage.page)
          
        channel.send(messages + '```', buttonNext)

        let counter = getPage.page

        client.on('clickButton', async (button) => {
          if (button.id === 'button_next') {
            await button.reply.defer()
            counter += 1
            messages = await queueMessage(counter)
            
            if (counter === getPage.totalPages) {
              button.message.edit(messages + '```', buttonPrev)
              return
            }
            
            button.message.edit(messages + '```', buttons)
          }

          if (button.id === 'button_prev') {
            await button.reply.defer()
            counter -= 1
            messages = await queueMessage(counter)

            if (counter === 1) {
              button.message.edit(messages + '```', buttonNext)
              return
            }
            
            button.message.edit(messages + '```', buttons)
          }
        })

      } catch(err) {
        console.log(err);
      }
    })
  }
}

const queueMessage = async (pageNum) => {
  let queueMessage = "```elm\n"

  await mongodb().then(async () => {
    try {
      let currentDocs = await songSchema.paginate({}, {page: pageNum, limit: 5})
      let songs = []
    
      songs.push(currentDocs.docs)
    
      for(let i = 0; i < currentDocs.docs.length; i++) {
        let title = songs[0][i].songTitle
        if (title.length >= 50) {
          title = title.slice(0, 50) + '...'
        } else {
          title += ' '.repeat(53 - title.length)
        }
        
        queueMessage += `${songs[0][i].queueNumber}) ${title} ${songs[0][i].songDuration}\n`
      }
    } catch(err) {
      console.log(err);
    }
  })

  return queueMessage
  
}
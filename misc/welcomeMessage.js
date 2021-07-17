const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require("canvas");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "👋-come-and-leave"
    );

    const newMember = member.user.tag;
    const newMemberAvatar = member.user.avatarURL({
      size: 1024,
      format: "png"
    });
    const guildName = member.guild.name;

    registerFont("./fonts/freeroad black.ttf", {
      family: "Freeroad",
      weight: "black"
    });
    registerFont("./fonts/freeroad bold.ttf", {
      family: "Freeroad",
      weight: "bold"
    });
    const canvas = createCanvas(1024, 500);
    const ctx = canvas.getContext("2d");
    ctx.font = "black 84px Freeroad";
    ctx.fillStyle = "#fff";

    await loadImage(
      "https://i.pinimg.com/564x/f3/f5/d7/f3f5d7b3f0eae0e48f2c2858e2b04662.jpg"
    ).then(async (img) => {
      ctx.drawImage(img, 0, 0, 1024, 500);
      ctx.textAlign = "center";
      ctx.fillText("WELCOME", 512, 380);
      ctx.font = "bold 58px Freeroad";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(newMember.toUpperCase(), 512, 450);
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fill();
    });

    await loadImage(newMemberAvatar).then(async (img) => {
      ctx.beginPath();
      ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 393, 47, 238, 238);
    });

    const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(newMember, newMemberAvatar)
      .setDescription([
        `**hi ${newMember}, welcome to ${guildName}**`,
        "_ _",
        `hi <@${member.id}>`,
        "thanks for joining our server, hope u enjoy the server!"
      ])
      .setThumbnail(
        "https://i.pinimg.com/originals/e3/c7/47/e3c747b1bf7b80b066f62d629209e694.gif"
      )
      .attachFiles(attachment)
      .setImage("attachment://welcome.png")
      .setFooter("Joined at ")
      .setTimestamp();

    channel.send(embeds);
  });
};

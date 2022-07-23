const cfg = require('../config.json')
const { MessageEmbed } = require("discord.js")
const f = require("../Functions/checkURL")

module.exports = async (message, args) => {
  try {
    const user = message.author
    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL(true))
      .setTitle(args[0])
      .setDescription(args[1])
      .setColor(cfg.embedcolor)
      .setTimestamp()
    if (args[2]) embed.setFooter(args[2], message.guild.iconURL(true))
    if (f.checkURL(args[3])) embed.setThumbnail(args[3])
    if (f.checkURL(args[4])) embed.setImage(args[4])

    message.channel.send({ embeds: [embed] })
  } catch (err) { console.error(err) }
}